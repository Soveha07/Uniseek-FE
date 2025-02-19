import React, { useState } from "react";
import Button from "../../components/onboarding/Button";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/common/Loading";
import { useJwtAuthActions } from "../../services/auth/Jwt";
import Textfield from "../../components/onboarding/Textfield";
import Button2 from "../../components/onboarding/Button2";


const SignUp: React.FC = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");
    const { signInWithGooglePopup, createUserWithEmailPassword } = useJwtAuthActions();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogInClick = () => {
        navigate("/login");
    };


    if (loading) {
        return (
            <div>
                <Loading></Loading>
            </div>
        )
    }

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="flex flex-col items-center">
                <h1 className="font-bold text-h3">Create your account</h1>
                <div className="mt-6">
                    <form className="flex flex-col items-center w-full" onSubmit={(e) => {
                        e.preventDefault();
                        createUserWithEmailPassword(email, password, username, phoneNumber, setLoading, setError);
                    }}>
                        <p className="self-start mb-2">Username</p>
                        <Textfield name="username" className="mb-5" placeholder="ex: John Smith" value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <p className="self-start mb-2">Phone number</p>
                        <Textfield name="phoneNumber" className="mb-5" placeholder="ex: 097423927" value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <p className="self-start mb-2">Email</p>
                        <Textfield name="email" className="mb-5" placeholder="ex: johnsmith@gmail.com" value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <p className="self-start mb-2">Password</p>
                        <Textfield name="password" className="mb-10 w-full" placeholder="********" value={password} isPassword={true}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <p className="text-red-500 mb-2">{error}</p>}
                        {/* <Link to="/forgot-password" className="text-b2 mb-11 text-primary font-bold">Forgot Password?</Link> */}
                        <Button className="text-white bg-myprimary" text="Sign Up" />
                    </form>
                </div>
                <div className="flex items-center justify-center w-[368px] h-[56px] mx-auto my-auto mt-2">
                    <hr className="flex-grow border-t border-gray-300" />
                    <span className="mx-4 text-gray-500">or</span>
                    <hr className="flex-grow border-t border-gray-300" />
                </div>
                <div className="container flex flex-col items-center">
                    <div className="">
                        <Button2 imgPath="onboarding/google" onClick={() => signInWithGooglePopup(setLoading, setError)} />
                    </div>
                    <p className="mt-2">Aleady have an account?&nbsp;
                        <span className="font-bold cursor-pointer text-myprimary" onClick={handleLogInClick}>
                            SIGN IN</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUp;