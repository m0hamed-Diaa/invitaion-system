"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
    Play,
    Pause,
    Volume2,
    VolumeX,
    Maximize,
    Loader2,
    SkipForward,
    SkipBack,
    Minimize,
    ArrowBigLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function VideoPlayer() {
    const router = useRouter();
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(1);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isHovering, setIsHovering] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const togglePlay = useCallback(() => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    }, [isPlaying]);

    const toggleMute = useCallback(() => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    }, [isMuted]);

    const handleVolumeChange = (value: number | readonly number[]) => {
        const newValue = Array.isArray(value) ? value[0] : value;
        const actualVolume = 1 - newValue;
        setVolume(actualVolume);
        if (videoRef.current) {
            videoRef.current.volume = actualVolume;
            videoRef.current.muted = actualVolume === 0;
            setIsMuted(actualVolume === 0);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current && !isDragging) {
            const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setProgress(currentProgress);
            setCurrentTime(videoRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
            setIsLoading(false);
        }
    };

    const handleProgressChange = (value: number | readonly number[]) => {
        const newValue = Array.isArray(value) ? value[0] : value;
        if (videoRef.current) {
            const newTime = (newValue / 100) * videoRef.current.duration;
            videoRef.current.currentTime = newTime;
            setProgress(newValue);
            setCurrentTime(newTime);
        }
    };

    const handleDragStart = () => {
        setIsDragging(true);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
        if (videoRef.current) {
            const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setProgress(currentProgress);
            setCurrentTime(videoRef.current.currentTime);
        }
    };

    const toggleFullscreen = useCallback(() => {
        if (containerRef.current) {
            if (!document.fullscreenElement) {
                containerRef.current.requestFullscreen();
                setIsFullscreen(true);
            } else {
                document.exitFullscreen();
                setIsFullscreen(false);
            }
        }
    }, []);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const forward = useCallback(() => {
        if (videoRef.current) {
            videoRef.current.currentTime = Math.min(
                videoRef.current.currentTime + 5,
                videoRef.current.duration
            );
        }
    }, []);

    const rewind = useCallback(() => {
        if (videoRef.current) {
            videoRef.current.currentTime = Math.max(
                videoRef.current.currentTime - 5,
                0
            );
        }
    }, []);

    const formatTime = (seconds: number) => {
        if (!seconds || isNaN(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

            switch (e.key) {
                case ' ':
                    e.preventDefault();
                    togglePlay();
                    break;
                case 'f':
                case 'F':
                    toggleFullscreen();
                    break;
                case 'm':
                case 'M':
                    toggleMute();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    forward();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    rewind();
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    if (videoRef.current) {
                        const newVolume = Math.min(volume + 0.1, 1);
                        setVolume(newVolume);
                        videoRef.current.volume = newVolume;
                        setIsMuted(newVolume === 0);
                    }
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    if (videoRef.current) {
                        const newVolume = Math.max(volume - 0.1, 0);
                        setVolume(newVolume);
                        videoRef.current.volume = newVolume;
                        setIsMuted(newVolume === 0);
                    }
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, [togglePlay, toggleFullscreen, toggleMute, forward, rewind, volume]);

    return (
        <div className="flex px-4 flex-col mt-24 max-w-md mx-auto">
            <Button variant={"secondary"} className={"w-fit"} onClick={() => router.back()}>
                رجوع <ArrowBigLeft />
            </Button>
            <div
                ref={containerRef}
                className="relative rounded-2xl overflow-hidden shadow-2xl mt-4 mb-10 bg-black group"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                {/* الفيديو */}
                <video
                    ref={videoRef}
                    className="w-full h-150"
                    playsInline
                    poster="/images/posterImage.png"
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onWaiting={() => setIsLoading(true)}
                    onCanPlay={() => setIsLoading(false)}
                    onClick={togglePlay}
                >
                    <source src="/videos/inviVideo.mp4" type="video/mp4" />
                </video>

                {/* مؤشر التحميل */}
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
                        <Loader2 className="w-12 h-12 text-white animate-spin" />
                    </div>
                )}

                {/* Overlay شفاف */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent pointer-events-none z-10" />

                {/* زر التشغيل في المنتصف */}
                <button
                    onClick={togglePlay}
                    className={cn(
                        "absolute inset-0 flex items-center justify-center transition-opacity duration-300 z-20 cursor-pointer",
                        isHovering ? "opacity-100" : "opacity-0"
                    )}
                    type="button"
                >
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-300 border-2 border-white/40 shadow-2xl">
                        {isPlaying ? (
                            <Pause className="w-10 h-10 text-white" />
                        ) : (
                            <Play className="w-10 h-10 text-white mr-1" />
                        )}
                    </div>
                </button>

                {/* أزرار التحكم السفلية */}
                <div className={cn(
                    "absolute bottom-0 left-0 right-0 p-4 transition-opacity duration-300 z-20",
                    isHovering ? "opacity-100" : "opacity-0"
                )}>
                    <div className="space-y-3">
                        {/* ✅ شريط التقدم - اتجاه عربي صحيح */}
                        <div className="flex items-center gap-3">
                            <span className="text-white text-xs font-mono min-w-10 drop-shadow-lg">
                                {formatTime(currentTime)}
                            </span>
                            <div className="flex-1 relative">
                                <Slider
                                    value={[progress]}
                                    onValueChange={handleProgressChange}
                                    onValueCommitted={handleDragEnd}
                                    onPointerDown={handleDragStart}
                                    max={100}
                                    step={0.1}
                                    className="cursor-pointer"
                                    dir="ltr"
                                />
                                <div className="flex justify-between text-white/30 text-[8px] mt-0.5 px-1">
                                    <span>البداية</span>
                                    <span>النهاية</span>
                                </div>
                            </div>
                            <span className="text-white text-xs font-mono min-w-10 drop-shadow-lg">
                                {formatTime(duration)}
                            </span>
                        </div>

                        {/* أزرار التحكم */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                                {/* رجوع 5 ثواني */}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={rewind}
                                    className="text-white hover:bg-white/20 hover:scale-110 transition-all"
                                    title="رجوع 5 ثواني"
                                >
                                    <SkipForward className="w-5 h-5" />
                                </Button>

                                {/* تشغيل/إيقاف */}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={togglePlay}
                                    className="text-white hover:bg-white/20 hover:scale-110 transition-all"
                                    title="تشغيل/إيقاف"
                                >
                                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                                </Button>

                                {/* تقدم 5 ثواني */}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={forward}
                                    className="text-white hover:bg-white/20 hover:scale-110 transition-all"
                                    title="تقدم 5 ثواني"
                                >
                                    <SkipBack className="w-5 h-5" />
                                </Button>

                                {/* كتم الصوت */}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={toggleMute}
                                    className="text-white hover:bg-white/20 hover:scale-110 transition-all"
                                    title="كتم/فك كتم الصوت"
                                >
                                    {isMuted || volume === 0 ?
                                        <VolumeX className="w-5 h-5" /> :
                                        <Volume2 className="w-5 h-5" />
                                    }
                                </Button>

                                {/* ✅ شريط مستوى الصوت - اتجاه عربي صحيح */}
                                <div className="w-24 hidden sm:block">
                                    <Slider
                                        value={[isMuted ? 1 : 1 - volume]}
                                        onValueChange={handleVolumeChange}
                                        onPointerDown={handleDragStart}
                                        max={1}
                                        step={0.01}
                                        className="cursor-pointer"
                                        dir="ltr"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-white/50 text-xs hidden lg:block drop-shadow-lg">
                                    Space ⏯ | ← → 5s | ↑ ↓ صوت | F ⛶
                                </span>

                                {/* تكبير/تصغير */}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={toggleFullscreen}
                                    className="text-white hover:bg-white/20 hover:scale-110 transition-all"
                                    title="تكبير/تصغير الشاشة"
                                >
                                    {isFullscreen ?
                                        <Minimize className="w-5 h-5" /> :
                                        <Maximize className="w-5 h-5" />
                                    }
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}