import { useEffect, useRef, useState } from "react";

import { MatrixType } from "../types";

export const useEditDistance = () => {
    const [matrix, setMatrix] = useState<MatrixType>(() => startMatrix());
    const index = useRef<number>(0);
    const chain: ((prev: MatrixType) => MatrixType)[] = [
        stepForward,
        stepResult,
    ];

    const initializeMatrix = (s1?: string, s2?: string) => {
        setMatrix(startMatrix(s1, s2));
    };

    const handleNextStep = () => {
        setMatrix((prev) => chain[index.current](prev));

        const newIndex: number = index.current + 1;
        if (newIndex > chain.length - 1) {
            index.current = 0;

            return;
        }

        index.current = newIndex;
    };

    const handlePreviousStep = () => {
        // Not implemented
    };

    useEffect(() => {
        console.log(matrix);
    }, [matrix]);

    return {
        initializeMatrix,
        handleNextStep,
        handlePreviousStep,
        matrix,
    };
};

const startMatrix = (s1?: string, s2?: string): MatrixType => {
    if (!s1 || !s2) {
        return {
            matrix: [],
            s1: "",
            s2: "",
            s1Size: 0,
            s2Size: 0,
            i: 0,
            j: 0,
        };
    }

    const s1Size = s1.length;
    const s2Size = s2.length;

    const matrix: number[][] = new Array(s1Size + 1)
        .fill(0)
        .map(() => new Array(s2Size + 1).fill(0));

    for (let i = 0; i <= s1Size; i++) {
        matrix[i][0] = i;
    }

    for (let j = 0; j <= s2Size; j++) {
        matrix[0][j] = j;
    }

    return {
        matrix,
        s1,
        s2,
        s1Size,
        s2Size,
        i: 1,
        j: 1,
    };
};

const stepForward = (prev: MatrixType): MatrixType => {
    if (!prev.s1 || !prev.s2) {
        return prev;
    }

    const { i, j, s1Size, s2Size } = prev;
    const newMatrix = prev.matrix.map((row) => [...row]);

    let nextI = i;
    let nextJ = j;

    if (j < s2Size) {
        nextJ++;
    } else if (i < s1Size) {
        nextI++;
        nextJ = 1;
    }

    return {
        ...prev,
        matrix: newMatrix,
        i: nextI,
        j: nextJ,
    };
};

const stepResult = (prev: MatrixType): MatrixType => {
    if (!prev.s1 || !prev.s2) {
        return prev;
    }

    const { s1, s2, i, j } = prev;
    const newMatrix = prev.matrix.map((row) => [...row]);

    const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;

    newMatrix[i][j] = Math.min(
        newMatrix[i - 1][j] + 1, // remove
        newMatrix[i][j - 1] + 1, // insert
        newMatrix[i - 1][j - 1] + cost, // replace
    );

    return {
        ...prev,
        matrix: newMatrix,
    };
};

