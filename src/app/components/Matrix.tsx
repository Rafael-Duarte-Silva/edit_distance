import { MatrixType } from "../types";

import { Label } from "./Label";

type MatrixProps = {
    matrix: MatrixType;
    handleRun(): void;
    handleNextStep(): void;
};

export const Matrix = ({ matrix, handleRun, handleNextStep }: MatrixProps) => {
    return (
        <>
            {matrix.matrix.length != 0 && (
                <div className="flex flex-1 flex-col items-center">
                    <Label
                        string={matrix.s2}
                        className="ml-10 grid gap-1.5"
                        keyPrefix="s2-label-"
                        styleProp={{
                            gridTemplateColumns: `repeat(${matrix.s2Size ? matrix.s2Size + 1 : 0}, minmax(0, 2.5rem))`,
                        }}
                    />

                    <div className="flex">
                        <Label
                            string={matrix.s1}
                            className="mr-1 flex flex-col gap-1.5"
                            keyPrefix="s1-label-"
                        />

                        <div className="flex flex-col items-center gap-y-6">
                            <div
                                className="grid gap-1 rounded-lg border border-gray-700 bg-gray-800 p-2"
                                style={{
                                    gridTemplateRows: `repeat(${matrix.s1Size ? matrix.s1Size + 1 : 0}, minmax(0, 2.5rem))`,
                                    gridTemplateColumns: `repeat(${matrix.s2Size ? matrix.s2Size + 1 : 0}, minmax(0, 2.5rem))`,
                                }}
                            >
                                {matrix.matrix.map((array, s1Index) =>
                                    array.map((value, s2Index) => {
                                        const p1 =
                                            matrix.i - 1 === s1Index &&
                                            matrix.j === s2Index;
                                        const p2 =
                                            matrix.i === s1Index &&
                                            matrix.j - 1 === s2Index;
                                        const p3 =
                                            matrix.i - 1 === s1Index &&
                                            matrix.j - 1 === s2Index;
                                        const p4 =
                                            matrix.i == s1Index &&
                                            matrix.j == s2Index;

                                        let pr = "";

                                        if (p1) {
                                            pr = "bg-blue-600";
                                        } else if (p2) {
                                            pr = "bg-red-600";
                                        } else if (p3) {
                                            pr = "bg-green-600";
                                        } else if (p4) {
                                            pr = "bg-gray-500";
                                        } else {
                                            pr = "bg-gray-700";
                                        }

                                        return (
                                            <div
                                                key={`${s1Index}${s2Index}`}
                                                className={`flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium text-white ${pr}`}
                                            >
                                                {value ||
                                                (s1Index == 0 && s2Index == 0)
                                                    ? value
                                                    : ""}
                                            </div>
                                        );
                                    }),
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="my-6 flex gap-4">
                        <button
                            onClick={handleRun}
                            className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white transition hover:bg-green-700"
                        >
                            Rodar
                        </button>

                        <button
                            onClick={handleNextStep}
                            className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white transition hover:bg-green-700"
                        >
                            Próximo Passo
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

