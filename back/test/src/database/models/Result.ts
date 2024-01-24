import mongoose from 'mongoose';
import type { Result } from 'types';

const ResultSchema = new mongoose.Schema<Result>({
  testId: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  approaches: {
    type: [
      {
        distance: {
          type: Number,
          required: true,
        },
        time: {
          type: Number,
          required: true,
        },
      },
    ],
    required: true,
  },
});

export const ResultModel = mongoose.model<Result>('Result', ResultSchema);
