import { Schema, model } from 'mongoose';
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
    year: { type: Number, require: true },
    code: { type: String, require: true, enum: academicSemesterCodes },
    startMonth: { type: String, require: true, enum: academicSemesterMonths },
    endMonth: { type: String, require: true, enum: academicSemesterMonths },
  },
  { timestamps: true }
);

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
);
