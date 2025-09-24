import { useEffect, useRef, useState } from "react";

import { MatrixType } from "../types";

export const useEditDistance = () => {
    const [matrix, setMatrix] = useState<MatrixType>(() => startMatrix());
    const IsRunning = useRef<boolean>(false);
    const chainIndex = useRef<number>(0);
    const chain: ((prev: MatrixType) => MatrixType)[] = [
        stepResult,
        stepForward,
    ];

    const initializeMatrix = (s1?: string, s2?: string) => {
        setMatrix(startMatrix(s1, s2));
    };

    const handleRun = async () => {
        if (IsRunning.current) {
            return;
        }
        IsRunning.current = true;

        const matrixCurrentPosition: number = matrix.i * matrix.j;
        const matrixLength: number = matrix.s1Size * matrix.s2Size + 1;

        for (let i: number = matrixCurrentPosition; i < matrixLength; i++) {
            for (let j: number = chainIndex.current; j < chain.length; j++) {
                setMatrix((prev) => chain[j](prev));
                await new Promise((resolve) => setTimeout(resolve, 200));
            }
        }

        IsRunning.current = false;
        chainIndex.current = matrixLength;
    };

    const handleNextStep = async () => {
        if (IsRunning.current) {
            return;
        }
        IsRunning.current = true;

        setMatrix((prev) => chain[chainIndex.current](prev));
        await new Promise((resolve) => setTimeout(resolve, 0));

        const newIndex: number = chainIndex.current + 1;
        if (newIndex > chain.length - 1) {
            IsRunning.current = false;
            chainIndex.current = 0;
            return;
        }

        IsRunning.current = false;
        chainIndex.current = newIndex;
    };

    const handlePreviousStep = () => {
        // Not implemented
    };

    useEffect(() => {
        console.log(matrix);
    }, [matrix]);

    return {
        initializeMatrix,
        handleRun,
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

