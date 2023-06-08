import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemesterServices } from './academicSemester.services';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterServices.createAcademicSemester(
      academicSemesterData
    );

    next();

    sendResponse(res, {
      success: true,
      message: 'Academic semester created successfully',
      data: result,
      statusCode: httpStatus.OK,
    });
  }
);

export const AcademicSemesterController = {
  createAcademicSemester,
};
