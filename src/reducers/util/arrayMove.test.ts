import { arrayMove } from "./arrayMove";

describe("arrayMove (single)", () => {
  it("basic_front_to_back", () => {
    const array = [1, 2, 3, 4, 5];
    const target = 1;
    const result = arrayMove(array, { from: 0, to: 1 }, target);
    expect(result).toEqual([2, 1, 3, 4, 5]);
  });

  it("basic_back_to_front", () => {
    const array = [1, 2, 3, 4, 5];
    const target = 0;
    const result = arrayMove(array, { from: 1, to: 2 }, target);
    expect(result).toEqual([2, 1, 3, 4, 5]);
  });

  it("basic_in_range", () => {
    const array = [1, 2, 3, 4, 5];
    const target = 1;
    const result = arrayMove(array, { from: 1, to: 2 }, target);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });
});

describe("arrayMove (multi)", () => {
  it("basic_front_to_back", () => {
    const array = [1, 2, 3, 4, 5];
    const target = 2;
    const result = arrayMove(array, { from: 0, to: 2 }, target);
    expect(result).toEqual([3, 1, 2, 4, 5]);
  });

  it("basic_back_to_front", () => {
    const array = [1, 2, 3, 4, 5];
    const target = 0;
    const result = arrayMove(array, { from: 2, to: 4 }, target);
    expect(result).toEqual([3, 4, 1, 2, 5]);
  });

  it("basic_in_range", () => {
    const array = [1, 2, 3, 4, 5];
    const target = 2;
    const result = arrayMove(array, { from: 2, to: 4 }, target);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });
});