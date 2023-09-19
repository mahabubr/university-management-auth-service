import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from './academicSemester.constant';
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from './academicSemester.interface';

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: { type: String, require: true, enum: academicSemesterTitles },
    year: { type: String, require: true },
    code: { type: String, require: true, enum: academicSemesterCodes },
    startMonth: { type: String, require: true, enum: academicSemesterMonths },
    endMonth: { type: String, require: true, enum: academicSemesterMonths },
    syncId: { type: String, require: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// PRE HOOK
academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Academic semester is already exist'
    );
  }
  next();
});

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
);
