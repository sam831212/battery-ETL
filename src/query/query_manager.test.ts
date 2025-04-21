import { filterData, queryData } from "./query_manager";

describe("Query and Filtering Logic", () => {
  const mockData = [
    { id: 1, date: "2023-01-01", voltage: 3.7, current: 1.2, soc: 80, temperature: 25, c_rate: 1, step_type: "charge" },
    { id: 2, date: "2023-01-02", voltage: 3.8, current: 1.0, soc: 90, temperature: 26, c_rate: 0.5, step_type: "discharge" },
    { id: 3, date: "2023-01-03", voltage: 3.6, current: 1.5, soc: 70, temperature: 24, c_rate: 2, step_type: "charge" },
    { id: 4, date: "2023-01-04", voltage: 3.9, current: 0.8, soc: 95, temperature: 27, c_rate: 0.2, step_type: "rest" }
  ];

  it("filters by date range", () => {
    const filtered = filterData(mockData, { dateFrom: "2023-01-02", dateTo: "2023-01-03" });
    expect(filtered.length).toBe(2);
    expect(filtered[0].id).toBe(2);
    expect(filtered[1].id).toBe(3);
  });

  it("filters by voltage range", () => {
    const filtered = filterData(mockData, { voltageMin: 3.7, voltageMax: 3.8 });
    expect(filtered.length).toBe(2);
    expect(filtered[0].id).toBe(1);
    expect(filtered[1].id).toBe(2);
  });

  it("filters by SOC and step type", () => {
    const filtered = filterData(mockData, { socMin: 80, stepType: "charge" });
    expect(filtered.length).toBe(1);
    expect(filtered[0].id).toBe(1);
  });

  it("filters by C-rate and temperature", () => {
    const filtered = filterData(mockData, { cRateMin: 0.5, cRateMax: 1.5, temperatureMax: 25 });
    expect(filtered.length).toBe(2);
    expect(filtered[0].id).toBe(1);
    expect(filtered[1].id).toBe(3);
  });

  it("returns all data if no filters applied", () => {
    const filtered = filterData(mockData, {});
    expect(filtered.length).toBe(mockData.length);
  });

  it("queries data and returns correct results", () => {
    const result = queryData(mockData, { voltageMin: 3.8 });
    expect(result.length).toBe(2);
    expect(result[0].id).toBe(2);
    expect(result[1].id).toBe(4);
  });
});