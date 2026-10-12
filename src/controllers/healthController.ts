import { Request, Response, NextFunction } from 'express';
import Health from '../schemas/healthSchema';

// 1. Show health status and current count
export const getHealth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let healthRecord = await Health.findOne();

    if (!healthRecord) {
      healthRecord = await Health.create({ status: 'OK', count: 0 });
    }

    res.status(200).json({
      status: healthRecord.status,
      count: healthRecord.count,
      lastCheckedAt: healthRecord.lastCheckedAt,
      uptime: process.uptime(),
    });
  } catch (error) {
    next(error);
  }
};

// 2. Take count / increment health count
export const takeHealthCount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const incrementBy = typeof req.body?.count === 'number' ? req.body.count : 1;

    const healthRecord = await Health.findOneAndUpdate(
      {},
      {
        $inc: { count: incrementBy },
        $set: { lastCheckedAt: new Date(), status: 'OK' },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({
      message: 'Health count updated successfully',
      status: healthRecord.status,
      count: healthRecord.count,
      lastCheckedAt: healthRecord.lastCheckedAt,
    });
  } catch (error) {
    next(error);
  }
};
