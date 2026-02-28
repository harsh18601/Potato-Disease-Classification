import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Camera, Leaf, AlertCircle, CheckCircle2, RefreshCcw, Info } from 'lucide-react';

const App = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const onSelectFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(null);
            return;
        }
        setSelectedFile(e.target.files[0]);
        setData(null);
        setError(null);
    };

    useEffect(() => {
        if (!selectedFile) {
            setPreview(null);
            return;
        }
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const handlePredict = async () => {
        if (!selectedFile) return;

        setIsLoading(true);
        let formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const res = await axios.post("http://localhost:8000/predict", formData);
            if (res.status === 200) {
                setData(res.data);
            }
        } catch (err) {
            setError("Failed to connect to the analysis engine. Please ensure the backend is running.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const clearSelection = () => {
        setSelectedFile(null);
        setPreview(null);
        setData(null);
        setError(null);
    };

    return (
        <div className="min-h-screen py-10 px-4 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-emerald-900/20 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-900/20 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Header section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12 z-10"
            >
                <div className="flex items-center justify-center gap-2 mb-4">
                    <Leaf className="w-10 h-10 text-emerald-400" />
                    <h1 className="text-5xl font-bold green-gradient-text tracking-tight">LeafGuard</h1>
                </div>
                <p className="text-slate-400 text-lg max-w-md mx-auto">
                    AI-powered potato disease detection for healthier crops and higher yields.
                </p>
            </motion.div>

            {/* Main interaction section */}
            <div className="w-full max-w-2xl z-10">
                <motion.div
                    className="glass-morphism rounded-3xl p-8 shadow-2xl"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    {!preview ? (
                        <label className="border-2 border-dashed border-slate-700/50 rounded-2xl p-12 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500/50 transition-all group overflow-hidden relative">
                            <input type="file" className="hidden" onChange={onSelectFile} accept="image/*" />
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-all"
                            >
                                <Upload className="w-8 h-8 text-emerald-400" />
                            </motion.div>
                            <p className="text-slate-300 text-xl font-medium mb-2">Drop your leaf image here</p>
                            <p className="text-slate-500">or click to browse your files</p>
                        </label>
                    ) : (
                        <div className="space-y-6">
                            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-700/50 aspect-video">
                                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                <button
                                    onClick={clearSelection}
                                    className="absolute top-4 right-4 p-2 bg-slate-900/80 rounded-full text-slate-300 hover:text-white transition-all backdrop-blur-md"
                                >
                                    <RefreshCcw className="w-5 h-5" />
                                </button>
                            </div>

                            {!data && !isLoading && !error && (
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handlePredict}
                                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold text-lg transition-all shadow-lg flex items-center justify-center gap-2"
                                >
                                    <Camera className="w-5 h-5" />
                                    Analyze Condition
                                </motion.button>
                            )}

                            {isLoading && (
                                <div className="flex flex-col items-center justify-center py-6">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                        className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full mb-4"
                                    />
                                    <p className="text-emerald-400 font-medium animate-pulse">Running AI diagnostics...</p>
                                </div>
                            )}

                            <AnimatePresence>
                                {data && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-emerald-500/20 rounded-xl">
                                                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-slate-500 uppercase text-xs font-bold tracking-widest mb-1">Diagnosis Result</h3>
                                                <p className="text-2xl font-bold text-white mb-2">{data.class.replace(/___/g, ': ').replace(/_/g, ' ')}</p>
                                                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${data.confidence}%` }}
                                                        className="h-full bg-emerald-500"
                                                    />
                                                </div>
                                                <p className="text-emerald-400 text-sm mt-2 font-medium">Confidence: {data.confidence}%</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center gap-4"
                                    >
                                        <AlertCircle className="w-6 h-6 text-red-500" />
                                        <p className="text-red-400 font-medium">{error}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </motion.div>

                {/* Info panel */}
                <motion.div
                    className="mt-8 flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {['Early Blight', 'Late Blight', 'Healthy'].map((disease, idx) => (
                        <div key={idx} className="glass-morphism flex-shrink-0 px-4 py-2 rounded-full border border-slate-700/30 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500/50"></div>
                            <span className="text-slate-400 text-sm whitespace-nowrap">{disease}</span>
                        </div>
                    ))}
                </motion.div>
            </div>

            <footer className="mt-auto pt-10 text-slate-600 text-sm">
                <p>&copy; 2026 LeafGuard Analytics. Precision agriculture for all.</p>
            </footer>
        </div>
    );
};

export default App;
