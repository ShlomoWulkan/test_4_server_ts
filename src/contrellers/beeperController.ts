import express, { Router , Request, Response } from 'express';
import NewBeeperDto from '../DTO/newBeeperDto';
import UserService from '../services/beeperService';
import User from '../models/beeperModel';
const router: Router = express.Router();

router.post('/register', async (
    req: Request<any, any, NewBeeperDto>, 
    res: Response
): Promise<void> => {
    try {
        const result = await UserService.createNewUser(req.body);
        if (result) {
            res.status(200).json({
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

router.get('/:id', async (
    req: Request, 
    res: Response
): Promise<User | undefined> => {
    try {
        const result = await UserService.getUser(req.params.id);
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

router.post('/follow', async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await UserService.createFollowUser(req.body.userId, req.body.followerId);
        if (result) {
            res.status(200).json({
            error: false,
            message: 'Success',
            data: req.body,
            result
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

router.get('/search', async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).json({
            error: false,
            message: 'Success',
            data: req.body
        })
    } catch (error) {
        res.status(500).json({ 
            error: true,
            message: error         
        });
    }
})

// protected route
router.get('/profile', async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).json({
            error: false,
            message: 'Success',
            data: req.body
        })
    } catch (error) {
        res.status(500).json({ 
            error: true,
            message: error         
        });
    }
})

// protected route
router.get('/followers', async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).json({
            error: false,
            message: 'Success',
            data: req.body
        })
    } catch (error) {
        res.status(500).json({ 
            error: true,
            message: error         
        });
    }
})

// protected route
router.get('/following', async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).json({
            error: false,
            message: 'Success',
            data: req.body
        })
    } catch (error) {
        res.status(500).json({ 
            error: true,
            message: error         
        });
    }
})

export default router
