import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Briefcase,
    Mic,
    Upload,
    X,
    Check,
    ChevronRight,
    Play,
    Square,
    Link as LinkIcon,
    Video,
    Palette,
    Timer,
    Trash2
} from 'lucide-react';
import ReactPixel from "react-facebook-pixel";

const Jobs = [
    {
        id: 'sales',
        title: 'Business Development Executive',
        type: 'Full-time',
        icon: <Briefcase className="w-6 h-6" />,
        description: 'We are looking for a persuasive and dynamic Sales Executive to join our team. If you have the gift of gab, we want you.',
        requirements: ['Excellent communication skills', 'Proven track record', 'Self-motivated'],
        color: 'from-amber-400 to-orange-500'
    },
    {
        id: 'video-editor',
        title: 'Video Editor',
        type: 'Full-time',
        icon: <Video className="w-6 h-6" />,
        description: 'Create compelling visual stories. looking for a Video Editor with valid experience in modern editing tools.',
        requirements: ['Proficiency in Premiere Pro/After Effects', 'Storytelling skills', 'Attention to detail'],
        color: 'from-blue-400 to-indigo-500'
    },
    {
        id: 'graphic-designer',
        title: 'Graphic Designer',
        type: 'Full-time',
        icon: <Palette className="w-6 h-6" />,
        description: 'Visualise and create stunning graphics. We need a creative mind to design engaging content for our brands.',
        requirements: ['Expertise in Photoshop/Illustrator', 'Creative portfolio', 'Branding knowledge'],
        color: 'from-pink-400 to-rose-500'
    }
];

const AudioRecorder = ({ onRecordingComplete }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);
    const [recordingTime, setRecordingTime] = useState(0);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const timerRef = useRef(null);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                const url = URL.createObjectURL(audioBlob);
                setAudioUrl(url);
                if (onRecordingComplete) onRecordingComplete(audioBlob);
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
            setRecordingTime(0);

            timerRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);

        } catch (err) {
            console.error("Error accessing microphone:", err);
            alert("Microphone access is required to record your intro.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            clearInterval(timerRef.current);
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        }
    };

    const deleteRecording = () => {
        setAudioUrl(null);
        setRecordingTime(0);
        if (onRecordingComplete) onRecordingComplete(null);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 flex flex-col items-center gap-4">
            <h3 className="text-white font-medium mb-2">Record Your Intro & Pitch</h3>

            {!audioUrl ? (
                <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                        {isRecording && (
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
                        )}
                        <button
                            onClick={isRecording ? stopRecording : startRecording}
                            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${isRecording
                                ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30'
                                : 'bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30'
                                }`}
                        >
                            {isRecording ? <Square className="w-6 h-6 fill-current" /> : <Mic className="w-8 h-8" />}
                        </button>
                    </div>
                    <div className="text-slate-400 font-mono text-lg flex items-center gap-2">
                        <Timer className="w-4 h-4" />
                        {formatTime(recordingTime)}
                    </div>
                    <p className="text-xs text-slate-500 text-center max-w-xs">
                        Tell us about yourself and why you're a perfect fit for sales.
                    </p>
                </div>
            ) : (
                <div className="w-full flex flex-col gap-4">
                    <div className="bg-slate-900/50 p-4 rounded-lg flex items-center justify-between border border-slate-700">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                                <Check className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-sm font-medium text-slate-200">Recording Saved</div>
                                <div className="text-xs text-slate-500">{formatTime(recordingTime)} - Ready to submit</div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <audio src={audioUrl} controls className="hidden" id="audio-preview" />
                            <button
                                onClick={() => document.getElementById('audio-preview').play()}
                                className="p-2 rounded-full hover:bg-slate-700 text-slate-300 transition-colors"
                                title="Play Preview"
                            >
                                <Play className="w-4 h-4" />
                            </button>
                            <button
                                onClick={deleteRecording}
                                className="p-2 rounded-full hover:bg-red-500/20 text-red-400 transition-colors"
                                title="Delete & Retry"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const ApplicationModal = ({ job, onClose }) => {
    const [submissionType, setSubmissionType] = useState('drive');
    const [formData, setFormData] = useState({ name: '', email: '', mobile: '', link: '', resume: null });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const fileInputRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append('jobTitle', job.title);
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('mobile', formData.mobile);
        if (formData.link) data.append('link', formData.link);
        if (formData.resume) data.append('resume', formData.resume);
        if (audioBlob) data.append('audio', audioBlob, 'recording.wav');

        try {
            const response = await fetch('https://digitaltoinfinity.com/career.php', {
                method: 'POST',
                body: data,
            });

            const result = await response.json();

            if (result.success) {
                setSubmitted(true);

                // Meta Pixel Event
                ReactPixel.track('SubmitApplication', {
                    content_name: job.title,
                    content_category: 'Career Application'
                });

            } else {
                alert(result.message || "Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error('Error submitting application:', error);
            alert("Failed to Submit. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            setFormData({ ...formData, resume: file });
        } else {
            alert('Please upload a valid PDF file.');
        }
    };

    const isSales = job.id === 'sales';

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-md"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl bg-[#0F172A]"
            >
                {/* Decorative Gradient Border */}
                <div className={`absolute inset-0 p-[1px] bg-gradient-to-br ${job.color} opacity-50 rounded-3xl pointer-events-none`} />

                {/* Content Container */}
                <div className="relative z-10 bg-[#0F172A] rounded-3xl h-full flex flex-col max-h-[85vh]">

                    {/* Header */}
                    <div className="relative px-8 max-[376px]:px-4 py-6 pb-0">
                        <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${job.color} opacity-10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none`} />

                        <div className="flex items-start justify-between relative z-10">
                            <div>
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-gradient-to-r ${job.color} text-white mb-3 shadow-lg shadow-white/10`}>
                                    Apply Now
                                </span>
                                <h2 className="text-3xl max-[426px]:text-2xl max-[376px]:text-xl max-[321px]:text-base font-black text-white tracking-tight mb-2">
                                    {job.title}
                                </h2>
                                <p className="text-slate-400">Join our team and build the future.</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Form Area */}
                    <div className="p-8 max-[376px]:px-4 overflow-y-auto custom-scrollbar">
                        {submitted ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center space-y-6">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className={`w-24 h-24 rounded-full bg-gradient-to-r ${job.color} flex items-center justify-center shadow-xl shadow-green-500/20`}
                                >
                                    <Check className="w-10 h-10 text-white" />
                                </motion.div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Application Sent!</h3>
                                    <p className="text-slate-400 max-w-xs mx-auto">
                                        Thank you for your interest. Our team will review your profile and get back to you soon.
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 px-8 rounded-xl transition-all"
                                >
                                    Close Window
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Full Name <span className="text-slate-500 font-bold">*</span></label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-slate-600"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Mobile Number <span className="text-slate-500 font-bold">*</span></label>
                                        <input
                                            type="tel"
                                            required
                                            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-slate-600"
                                            placeholder="+1 (555) 000-0000"
                                            value={formData.mobile}
                                            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Email Address <span className="text-slate-500 font-bold">*</span></label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-slate-600"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>

                                {/* Resume Upload - For All Roles */}
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Upload Resume (PDF) <span className="text-slate-500 font-bold">*</span></label>
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="w-full bg-slate-900/50 border-2 border-dashed border-slate-700 rounded-xl px-4 py-6 text-white cursor-pointer hover:border-slate-500 hover:bg-slate-800/50 transition-all flex flex-col items-center justify-center gap-2 group"
                                    >
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            required
                                            accept="application/pdf"
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                        {formData.resume ? (
                                            <div className="flex items-center gap-2 text-green-400">
                                                <Briefcase className="w-5 h-5" />
                                                <span className="text-sm font-medium truncate max-w-[200px]">{formData.resume.name}</span>
                                                <span className="text-xs bg-slate-800 px-2 py-0.5 rounded text-slate-400">Change</span>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="p-3 bg-slate-800 rounded-full group-hover:scale-110 transition-transform">
                                                    <Upload className="w-5 h-5 text-slate-400 group-hover:text-white" />
                                                </div>
                                                <p className="text-sm text-slate-400 group-hover:text-slate-300">Click to upload your resume</p>
                                                <p className="text-xs text-slate-600">PDF only, max 5MB</p>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="w-full h-px bg-slate-800 my-4" />

                                {isSales ? (
                                    <div className="space-y-4">
                                        <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                                            <Mic className="w-4 h-4 text-blue-400" />
                                            Record Your Pitch <span className="text-slate-500 font-bold">*</span>
                                        </label>
                                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700 border-dashed">
                                            <AudioRecorder onRecordingComplete={setAudioBlob} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <div className="flex p-1.5 bg-slate-900 rounded-xl border border-slate-800">
                                            <button
                                                type="button"
                                                onClick={() => setSubmissionType('drive')}
                                                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${submissionType === 'drive'
                                                    ? 'bg-slate-800 text-white shadow-lg'
                                                    : 'text-slate-500 hover:text-slate-300'
                                                    }`}
                                            >
                                                <Upload className="w-4 h-4" />
                                                Google Drive
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setSubmissionType('portfolio')}
                                                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${submissionType === 'portfolio'
                                                    ? 'bg-slate-800 text-white shadow-lg'
                                                    : 'text-slate-500 hover:text-slate-300'
                                                    }`}
                                            >
                                                <LinkIcon className="w-4 h-4" />
                                                Portfolio URL
                                            </button>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
                                                {submissionType === 'drive' ? 'Paste Drive Link *' : 'Portfolio Website *'}
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="url"
                                                    required
                                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3.5 text-white pl-11 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-slate-600"
                                                    placeholder={submissionType === 'drive' ? 'https://drive.google.com/...' : 'https://www.behance.net/username'}
                                                    value={formData.link}
                                                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                                />
                                                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                                                    {submissionType === 'drive' ? <Upload className="w-5 h-5" /> : <LinkIcon className="w-5 h-5" />}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={loading || (isSales && !audioBlob) || !formData.resume}
                                        className={`w-full py-4 max-[426px]:py-3 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all relative overflow-hidden group ${loading || (isSales && !audioBlob) || !formData.resume
                                            ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                                            : `text-white shadow-lg hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer`
                                            }`}
                                    >
                                        {!loading && !(isSales && !audioBlob) && formData.resume && (
                                            <div className={`absolute inset-0 bg-gradient-to-r ${job.color} transition-all`} />
                                        )}

                                        <span className="relative z-10 flex items-center gap-2">
                                            {loading ? 'Submitting...' : 'Submit Application'}
                                            {!loading && <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                                        </span>
                                    </button>
                                </div>

                            </form>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const JobCard = ({ job, onApply }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="group relative bg-slate-900/40 backdrop-blur-md border border-slate-700/50 rounded-2xl overflow-hidden hover:border-slate-600 transition-colors"
        >
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${job.color}`} />

            <div className="p-8 flex flex-col h-full">
                <div className="flex items-start justify-between mb-6">
                    <div className="p-3 rounded-xl bg-slate-800 text-white group-hover:scale-110 transition-transform duration-300">
                        {job.icon}
                    </div>
                    <span className="px-3 py-1 rounded-full bg-slate-800/50 text-slate-400 text-xs font-medium border border-slate-700/50">
                        {job.type}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">
                    {job.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                    {job.description}
                </p>

                <div className="mb-8">
                    <ul className="space-y-2">
                        {job.requirements.map((req, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm text-slate-500">
                                <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${job.color}`} />
                                {req}
                            </li>
                        ))}
                    </ul>
                </div>

                <button
                    onClick={() => {
                        onApply(job);
                        ReactPixel.track('Contact', {
                            content_name: `Apply for ${job.title}`,
                            content_category: 'Career'
                        });
                    }}
                    className="w-full py-3 rounded-xl bg-slate-800 text-white font-medium group-hover:bg-white group-hover:text-slate-900 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                    Apply Now
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>

            {/* Decorative Glow */}
            <div className={`absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-r ${job.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500 pointer-events-none`} />
        </motion.div>
    );
};

const Career = () => {
    const [selectedJob, setSelectedJob] = useState(null);

    return (
        <motion.div
            onViewportEnter={() => ReactPixel.track('ViewContent', { content_name: 'Career Page' })}
            className="min-h-screen bg-slate-950 py-16 max-[769px]:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        >
            {/* Background Ambience */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-6xl max-[426px]:text-4xl max-[321px]:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500 mb-6 max-[321px]:mb-4 tracking-tight">
                        Join Our <span className="text-blue-500">Revolution</span>
                    </h1>
                    <p className="text-lg md:text-xl max-[321px]:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        We are building something extraordinary. If you have the passion to create, innovate, and lead, we want to hear from you.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Jobs.map((job) => (
                        <JobCard key={job.id} job={job} onApply={setSelectedJob} />
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedJob && (
                    <ApplicationModal job={selectedJob} onClose={() => setSelectedJob(null)} />
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Career;