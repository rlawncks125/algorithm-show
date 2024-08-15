"use client";

import React, { useCallback, useEffect, useState } from "react";

function* bfsSolution(n, m, array, updateVisited) {
  const visited = Array.from({ length: n }, () => Array(m).fill(-1));
  const direc = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  // ↑ 초기화

  const queue = [];

  // 목표 지점(2) 찾기 && 갈수 없는땅 0 표시
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (+array[i][j] === 0) {
        visited[i][j] = 0;
      }
      if (+array[i][j] === 2) {
        visited[i][j] = 0;
        queue.push([i, j]);
      }
    }
  }

  updateVisited(visited);
  // bfs
  while (queue.length > 0) {
    const [x, y] = queue.shift();

    updateVisited(visited); // 상태 업데이트를 위해 새 배열 생성
    // console.log(...visited);
    yield;
    for (const [dx, dy] of direc) {
      const nx = x + dx;
      const ny = y + dy;

      if (
        // 범위
        nx >= 0 &&
        ny >= 0 &&
        nx < n &&
        ny < m &&
        //
        visited[nx][ny] === -1 &&
        +array[nx][ny] === 1
      ) {
        visited[nx][ny] = visited[x][y] + 1;
        queue.push([nx, ny]);
      }
    }
  }
}

export default function Answer({ n, m, array }) {
  const [pillVisited, setPillVisited] = useState(
    Array.from({ length: n }, () => Array(m).fill(-1))
  );

  const updateVisited = useCallback((newVisited) => {
    setPillVisited(() => JSON.parse(JSON.stringify(newVisited)));
  }, []);

  const generateSolution = useCallback(
    () => bfsSolution(n, m, array, updateVisited),
    [n, m, array]
  );

  const [generator, setGenerator] = useState(null);

  useEffect(() => {
    const gen = generateSolution();
    setGenerator(gen);
    gen.next();
  }, [generateSolution]);

  const onClick = () => {
    if (generator) {
      generator.next();
    }
  };

  return (
    <div>
      <button onClick={onClick}>다음</button>
      {pillVisited.map((v, vindex) => (
        <div key={"first" + v + vindex} className="flex justify-start gap-2">
          {v.map((f, findex) => (
            <div
              className={`border w-8 h-8 ${
                f === 0 ? "bg-red-400" : f !== -1 ? "bg-yellow-600" : ""
              }`}
              key={"two" + f + findex}
            >
              {f}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
