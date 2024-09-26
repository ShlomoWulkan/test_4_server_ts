import express, { Router , Request, Response } from 'express';
import NewBeeperDto from '../DTO/newBeeperDto';
import BeeperService from '../services/beeperService';
import Beeper from '../models/beeperModel';
import e from 'express';
const router: Router = express.Router();

router.post('/', async (
    req: Request<any, any, NewBeeperDto>, 
    res: Response
): Promise<void> => {
    try {
        const result: boolean = await BeeperService.createNewBeeper(req.body);
        if (result) {
            res.status(201).json({
            error: false,
            message: 'Success',
            data: req.body
            })
        }  
        else {
            res.status(500).json({ 
                error: true,
                message: 'Failed'         
            });
        }             
    } catch (error) {
        res.status(400).json({ 
            error: true,
            message: error         
        });
    }
})

router.get('/', async (
    req: Request, 
    res: Response
): Promise<Beeper[] | undefined> => {
    const result: Beeper[] = await BeeperService.getAllBeepers() as Beeper[];
    try {
        if (result) {
            res.status(200).json({
            error: false,
            message: 'Success',
            data: result
            })
        }   
        else {
            res.status(500).json({ 
                error: true,
                message: 'Failed'         
            });
        }  
        return result;
    } catch (error) {
        res.status(400).json({ 
            error: true,
            message: error         
        });
    }
})

router.get('/:id', async (
    req: Request, 
    res: Response
): Promise<Beeper | undefined> => {
    try {
        const result: Beeper = await BeeperService.getOneBeeper(parseInt(req.params.id)) as Beeper;
        if (result) {
            res.status(200).json({
            error: false,
            message: 'Success',
            data: result
            })
        }   
        else {
            res.status(500).json({ 
                error: true,
                message: 'Failed'         
            });
        }  
        return result;
    } catch (error) {
        res.status(400).json({ 
            error: true,
            message: error         
        });
    }
})

router.put('/:id/status', async (req: Request, res: Response): Promise<void> => {
    try {
        let result: boolean;
        if (req.body.status === String) {
            if (!req.body.latitude || !req.body.longitude) {
            result = await BeeperService.updateBeeperStatus(parseInt(req.params.id));
            } else {
            result = await BeeperService.updateBeeperStatus(parseInt(req.params.id), req.body.latitude, req.body.longitude);
            }        
        }
        else {
            if (!req.body.latitude || !req.body.longitude) {
            result = await BeeperService.updateBeeperStatus(parseInt(req.params.id), req.body.status);
        }
            else {
            result = await BeeperService.updateBeeperStatus(parseInt(req.params.id), req.body.status, req.body.latitude, req.body.longitude);
            }
        }        
        if (result) {
            res.status(200).json({
            error: false,
            message: 'Success',
            data: result
            })
        } else {
            res.status(500).json({ 
                error: true,
                message: 'Failed'         
            });
        }
    } catch (error) {
        res.status(400).json({ 
            error: true,
            message: error         
        });
    }
});

router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await BeeperService.deleteBeeper(parseInt(req.params.id));
        if (result) {
            res.status(200).json({
            error: false,
            message: 'Success',
            data: req.body
            })
        } else {
            res.status(500).json({ 
                error: true,
                message: 'Failed'         
            });
        }
    } catch (error) {
        res.status(400).json({ 
            error: true,
            message: error         
        });
    }
})

router.get('/status/:status', async (req: Request, res: Response): Promise<Beeper[] | undefined> => {
    try {
        const result = await BeeperService.getBeepersByStatus(req.params.status);
        if (result) {
            res.status(200).json({
            error: false,
            message: 'Success',
            data: result
            })
        } else {
            res.status(500).json({ 
                error: true,
                message: 'Failed'         
            });
        }
        return result;
    } catch (error) {
        res.status(400).json({ 
            error: true,
            message: error         
        });
    }
})

export default router;
