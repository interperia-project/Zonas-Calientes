import { Response, Request } from "express";
import TrainingInformationDto from "../dtos/trainingInformation.dto";
import TrainingInformationRepo from "../repository/trainingInformation.repo";
import trainingInformationRepo from "../repository/trainingInformation.repo";



export let crear = async (req: Request, res: Response) =>{
    try {
        const body = req.body;

        const trainingInformationDto = new TrainingInformationDto(body);
        const trainingInformationRepo = new TrainingInformationRepo();
        const newTrainingInformation = await trainingInformationRepo.crear(trainingInformationDto);

        res.json({
            ok: true,
            data: newTrainingInformation,
            message:'Nueva información de entrenamiento creada con exito',
            error: null
        })

    } catch (error) {
        res.json({
            ok: false,
            error: error,
            message: 'Error al crear información de entrenamiento'
        });
    }
}

export let obtenerPorId = async (req: Request, res: Response) => {
    
    const trainingInformationId = req.params.id;

    try {
        const trainingInformationRepo = new TrainingInformationRepo();
        const trainingInformation = await trainingInformationRepo.obtenerPorId(trainingInformationId);
        res.json({
            ok: true,
            data: trainingInformation,
            message: '',
            error: null
        });
    } catch (error) {
        res.status(404).json({
            ok: false,
            error: error,
            message: 'Error al obtener información de entrenamiento por id'
        });
    }
}

export let obtenerTodos = async (req: Request, res: Response) => {
    try {
        const trainingInformationRepo = new TrainingInformationRepo();
        const trainingInformation = await trainingInformationRepo.obtenerTodos();
        res.json({
            ok: true,
            data: trainingInformation,
            message: '',
            error: null
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            error: error,
            message: 'Error al obtener información de entrenamiento'
        });
    }
}

export let actualizarPorId = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const rtaTrainingInformation = new trainingInformationRepo();
        const respuesta = await rtaTrainingInformation.actualizarPorId(body._id, body);
        res.json({
            ok: true,
            data: respuesta,
            message:'Información  actualizada con éxito',
            error: null
        });
    } catch (error: any) {
        res.json({
            ok: false,
            error: error,
            message: 'Error al actualizar información'
        });
    }
}