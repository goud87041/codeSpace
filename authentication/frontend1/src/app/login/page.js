

export default function Login (){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setIsLoading(true);
        setError("");
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
            });
        }
        catch (error) {
            setError(error.message);
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <button type="submit" disabled={isLoading}>{isLoading ? "Loading..." : "Login"}</button>
            {error && <p>{error}</p>}
        </form>
        </>
    )
}