// src/core/analytics/AnalyticsModule.ts

export interface RateCapabilityResult {
  cRates: number[];
  dischargeCapacities: number[];
  chargeCapacities: number[];
  efficiencies: number[];
}

export interface DegradationTrendResult {
  cycleNumbers: number[];
  capacities: number[];
  trendLine: number[];
}

export interface AnomalyDetectionResult {
  indices: number[];
  values: number[];
  reason: string;
}

export interface OCVGenerationResult {
  soc: number[];
  ocv: number[];
}

export class AnalyticsModule {
  // Rate Capability Extraction
  static extractRateCapability(data: {cRate: number, dischargeCapacity: number, chargeCapacity: number, efficiency: number}[]): RateCapabilityResult {
    const cRates = data.map(d => d.cRate);
    const dischargeCapacities = data.map(d => d.dischargeCapacity);
    const chargeCapacities = data.map(d => d.chargeCapacity);
    const efficiencies = data.map(d => d.efficiency);
    return { cRates, dischargeCapacities, chargeCapacities, efficiencies };
  }

  // Degradation Trend Extraction (simple linear regression)
  static extractDegradationTrend(data: {cycle: number, capacity: number}[]): DegradationTrendResult {
    const cycleNumbers = data.map(d => d.cycle);
    const capacities = data.map(d => d.capacity);
    // Simple linear regression for trend line
    const n = cycleNumbers.length;
    const sumX = cycleNumbers.reduce((a, b) => a + b, 0);
    const sumY = capacities.reduce((a, b) => a + b, 0);
    const sumXY = cycleNumbers.reduce((sum, x, i) => sum + x * capacities[i], 0);
    const sumXX = cycleNumbers.reduce((sum, x) => sum + x * x, 0);
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    const trendLine = cycleNumbers.map(x => slope * x + intercept);
    return { cycleNumbers, capacities, trendLine };
  }

  // Anomaly Detection (z-score based)
  static detectAnomalies(data: number[], threshold: number = 3): AnomalyDetectionResult {
    const mean = data.reduce((a, b) => a + b, 0) / data.length;
    const std = Math.sqrt(data.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / data.length);
    const indices: number[] = [];
    const values: number[] = [];
    data.forEach((v, i) => {
      const z = std === 0 ? 0 : Math.abs((v - mean) / std);
      if (z > threshold) {
        indices.push(i);
        values.push(v);
      }
    });
    return { indices, values, reason: `z-score > ${threshold}` };
  }

  // OCV Generation (average voltage per SOC bin)
  static generateOCVCurve(data: {soc: number, voltage: number}[], binSize: number = 1): OCVGenerationResult {
    const socBins: {[bin: number]: number[]} = {};
    data.forEach(({ soc, voltage }) => {
      const bin = Math.round(soc / binSize) * binSize;
      if (!socBins[bin]) socBins[bin] = [];
      socBins[bin].push(voltage);
    });
    const soc: number[] = [];
    const ocv: number[] = [];
    Object.keys(socBins).sort((a, b) => Number(a) - Number(b)).forEach(bin => {
      soc.push(Number(bin));
      const voltages = socBins[Number(bin)];
      ocv.push(voltages.reduce((a, b) => a + b, 0) / voltages.length);
    });
    return { soc, ocv };
  }
}