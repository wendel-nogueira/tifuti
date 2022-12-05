import Router, { useRouter } from "next/router";
import { createContext, useState } from "react";
import firebase, { db } from "../lib/firebase";

interface AuthContextType {
    user: firebase.User | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signInWithFacebook: () => Promise<void>;
    signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signInWithGoogle = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();

        try {
            setLoading(true);
            return await firebase.auth().signInWithPopup(provider).then((result) => {
                const data = {
                    userId: result.user?.uid,
                    name: result.user?.displayName,
                    email: result.user?.email,
                    pic: result.user?.photoURL,
                    role: "user",
                }

                db.collection("users").doc(result.user?.uid).get().then((doc) => {
                    if (doc.exists) {
                        setUser(result.user);
                    } else {
                        db.collection("users").doc(result.user?.uid).set(data).then(() => {
                            console.log("Document successfully written!");
                            setUser(data);
                        }).catch((error) => {
                            console.error("Error writing document: ", error);
                        });
                    }
                }).catch((error) => {
                    console.log("Error getting document:", error);
                });
                
                Router.push("/");
            }).catch((error) => {
                console.log(error);
                setLoading(false);
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const signInWithFacebook = async () => {
        const provider = new firebase.auth.FacebookAuthProvider();

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


    
    const router = useRouter();

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            setUser(user);
        } else {
            setUser(null);
        }
    });

    return (
        <AuthContext.Provider value={{ user, loading, signInWithGoogle, signInWithFacebook, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};