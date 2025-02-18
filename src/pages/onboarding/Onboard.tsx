import React from "react";
import Button from "../../components/onboarding/Button";

const Onboard: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col items-center justify-center">
                <div className="">
                    <img
                        src={`${process.env.PUBLIC_URL}/onboarding/logo.svg`}
                        alt="Logo"
                        className="md:w-96 h-auto w-72"
                    />

                </div>
                <div className="mt-20 mb-4">
                    <Button className="text-white bg-myprimary" text="Sign In"></Button>
                </div>
                <div>
                    <Button className="text-black bg-white border border-black" text="Continue As Guest"></Button>
                </div>
            </div>
        </div>

    );
};

export default Onboard;
