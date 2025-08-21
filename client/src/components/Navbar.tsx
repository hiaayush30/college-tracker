import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import BedtimeIcon from '@mui/icons-material/Bedtime';
import SunnyIcon from '@mui/icons-material/Sunny';
import { useState } from "react";

function Navbar() {
    const [darkMode,setDarkMode] = useState(false);
    const toggleTheme = () => {
            document.body.classList.toggle("dark")
            setDarkMode(!darkMode)
    }
    const navigate = useNavigate();
    return (
        <nav className='transition-all dark:text-slate-200 dark:bg-slate-800 py-2 px-4 flex items-center justify-between border-b-1 dark:border-b-slate-200'>
            <div className="flex flex-col justify-end">
                <h2 className="lg:text-4xl md:text-3xl text-2xl font-bold">
                    College Tracker
                </h2>
                <p className="text-slate-700 px-1 dark:text-slate-300">Bunk smartly</p>
            </div>
            <div className="flex sm:flex-row flex-col items-center gap-3">
                <button onClick={toggleTheme} className="cursor-pointer rounded-full border-2 border-yellow-500 dark:border-slate-200 p-1">
                   {darkMode ?  <BedtimeIcon className="text-slate-200" />: <SunnyIcon className="text-yellow-500" />}
                </button>
                <Button
                    sx={{
                        fontSize: { xs: "0.7rem", sm: "0.85rem", md: "1rem" },
                        padding: { xs: "4px 8px", sm: "6px 12px", md: "8px 16px" },
                    }}
                    onClick={() => navigate("/login")} variant="contained">Login</Button>
                <Button
                    sx={{
                        fontSize: { xs: "0.7rem", sm: "0.85rem", md: "1rem" }, // smaller font on small screens
                        padding: { xs: "4px 8px", sm: "6px 12px", md: "8px 16px" }, // smaller padding on small screens
                    }}
                    onClick={() => navigate("/signup")} variant="outlined">Signup</Button>
            </div>
        </nav>
    )
}

export default Navbar
