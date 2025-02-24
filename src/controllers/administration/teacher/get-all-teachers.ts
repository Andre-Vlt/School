import express from 'express';
import { makeGetAllTeachersUseCase } from 'src/use-cases/factory/make-get-all-teachers-use-case';
import { z } from 'zod';

export async function getAllTeachers(
    req: express.Request,
    res: express.Response,
){
    const getAllTeachersUseCase = makeGetAllTeachersUseCase();
    const teachers = await getAllTeachersUseCase.handler();
    return res.status(200).send(teachers);
}