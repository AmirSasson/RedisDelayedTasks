
function solutionTEST(arr: number[]) {
    console.log("d");

    arr.sort((a, b) => a - b);
    let smallestPositive = 1;
    for (let index = 1; index < arr.length; index++) {
        const prev = arr[index - 1];
        const element = arr[index];
        if (element - prev > 1) {
            return smallestPositive = element - 1;
        }
    }
    return arr[arr.length - 1] > 0 ? arr[arr.length - 1] : 1;
}

function solution1(A: number, B: number, C: number, D: number) {
    const arr = [A, B, C, D];
    const maxX = Math.max(...arr);
    const minX = Math.min(...arr);
    if (maxX === minX) { return 0; }
    const maxIndex = arr.findIndex((n) => n === maxX);
    const minIndex = arr.findIndex((n) => n === minX);
    const leftovers = arr.filter((n, i) => i !== maxIndex && i !== minIndex);
    return sqrDistance({ x: maxX, y: leftovers[0] }, { x: minX, y: leftovers[1] });

}
function sqrDistance(pointA: { x: number, y: number }, pointB: { x: number, y: number }): number {
    return Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2);
}

// console.log(solution1(1, 2, 1, 3));

// console.log(sqrDistance({ x: 1, y: 1 }, { x: 3, y: 2 }));

function solution(target: number, allInsCount: number) {
    return play(target, allInsCount, 1) - 1;
    // write your code in JavaScript (Node.js 8.9.4)
}

function play(target: number, allInsCount: number, current: number) {
    if (target === 1) {
        return 1;
    }
    if (target === 0) {
        return 0;
    }
    if (allInsCount > 1 && current * 2 <= target) {
        return play(target - current * 2, allInsCount - 1, current * 2);
    }
    // else
    return play(target - 1, allInsCount, current + 1);
}

console.log(solution(8, 0));
