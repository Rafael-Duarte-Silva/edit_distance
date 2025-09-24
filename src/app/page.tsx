"use client";

import { useRef } from "react";

import { Form } from "./components/Form";
import { Matrix } from "./components/Matrix";

import { useEditDistance } from "./hooks/useEditDistance";

export default function Home() {
    const s1Ref = useRef<HTMLInputElement>(null);
    const s2Ref = useRef<HTMLInputElement>(null);

    const { initializeMatrix, handleRun, handleNextStep, matrix } =
        useEditDistance();

    return (
        <main className="flex h-screen w-screen items-center bg-gray-900">
            <Form
                initializeMatrix={initializeMatrix}
                s1Ref={s1Ref}
                s2Ref={s2Ref}
            />

            <Matrix
                matrix={matrix}
                handleRun={handleRun}
                handleNextStep={handleNextStep}
            />
        </main>
    );
}
