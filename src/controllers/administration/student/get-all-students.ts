import express from 'express'
import { makeGetAllStudentsUseCase } from 'src/use-cases/factory/make-get-all-students-use-case';

export async function getAllStudents(
    req: express.Request,
    res: express.Response
){
    const getAllStudentsUseCase = makeGetAllStudentsUseCase();
    const students = await getAllStudentsUseCase.handler();
    return res.status(200).send(students);
}