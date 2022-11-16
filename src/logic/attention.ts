import {
  AplitudesPerFrequencyBands,
  AttentionBetaScore,
  AttentionScore,
  Last10SecOfRawEEG,
  NFFT,
  RawEEG,
} from "../types";
import { BrainMap, performanceConfig } from "../constants/enums";

const fftfunction = (a: number) => ({} as AplitudesPerFrequencyBands);

const attentionBeta = (rawEEG: Last10SecOfRawEEG) => {
  const requiredHistoryLength =
    performanceConfig.defaultHistoryDurationInSeconds *
    performanceConfig.defaultSamplingRateInHz;
  const latestRagEEG =
    rawEEG.length > requiredHistoryLength && rawEEG[requiredHistoryLength - 1];
  latestRagEEG && fftfunction(latestRagEEG.fp1).BETA_LOW;
};

/* 
  const rawEEGDifferences = rawEEG.forEach((sample, index) => {
    if (index !== 0) {
      return sample - rawEEGDifferences[index - 1];
    }
  });
*/

export { attentionBeta };
