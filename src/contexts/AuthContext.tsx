import Router from "next/router";
import { createContext, useState } from "react";
import firebase from "../lib/firebase";

interface AuthContextType {
    user: firebase.User | null;
    loading: boolean;
    signIn: () => void;
    signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signIn = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();

        try {
            setLoading(true);
            return await firebase.auth().signInWithPopup(provider).then((result) => {
                setUser(result.user);
                Router.push("/");
            }).catch((error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const signOut = async () => {
        try {
            return await firebase.auth().signOut().then(() => {
                setUser(null);
                Router.push("/login");
            }).catch((error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};