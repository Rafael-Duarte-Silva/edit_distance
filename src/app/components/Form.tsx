import { RefObject } from "react";

type FormProps = {
    initializeMatrix(s1?: string, s2?: string): void;
    s1Ref: RefObject<HTMLInputElement | null>;
    s2Ref: RefObject<HTMLInputElement | null>;
};

export const Form = ({ initializeMatrix, s1Ref, s2Ref }: FormProps) => {
    return (
        <div className="flex h-full flex-1 flex-col items-center justify-center border-r-2 border-gray-700">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    initializeMatrix(
                        s1Ref.current?.value,
                        s2Ref.current?.value,
                    );
                }}
                className="flex flex-col gap-4 rounded-2xl bg-gray-800 p-6 shadow-lg"
            >
                <div className="flex flex-col">
                    <label
                        htmlFor="s1"
                        className="mb-1 text-sm font-medium text-gray-200"
                    >
                        Primeira String
                    </label>
                    <input
                        id="s1"
                        type="text"
                        ref={s1Ref}
                        className="rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label
                        htmlFor="s2"
                        className="mb-1 text-sm font-medium text-gray-200"
                    >
                        Segunda String
                    </label>
                    <input
                        id="s2"
                        type="text"
                        ref={s2Ref}
                        className="rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
                >
                    Gerar Matriz
                </button>
            </form>
        </div>
    );
};

