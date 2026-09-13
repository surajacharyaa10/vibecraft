"use client"

import {
  ChevronRight,
  Copy,
  Hand,
  Maximize2,
  Menu,
  Minus,
  Monitor,
  MoreHorizontal,
  PenLine,
  Play,
  Plus,
  Redo2,
  Smartphone,
  Undo2,
} from "lucide-react"
import { useState } from "react"

const listItems = [
  ["Inbox", "Supporting text"],
  ["Archive", "Supporting text"],
  ["Starred", "Supporting text"],
]

export default function Home() {
  const [zoom, setZoom] = useState(62)
  const [device, setDevice] = useState<"phone" | "desktop">("phone")
  const [screenCount, setScreenCount] = useState(1)
  const [activeScreen, setActiveScreen] = useState(1)
  const screenName = activeScreen === 1 ? "Home" : `Screen ${activeScreen}`

  function changeZoom(amount: number) {
    setZoom((current) => Math.min(120, Math.max(35, current + amount)))
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#f8f4fc] text-[#292532]">
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex h-10 shrink-0 items-end gap-1 overflow-x-auto border-b border-violet-100 bg-[#fcf9ff] px-3">
          {Array.from({ length: screenCount }, (_, index) => {
            const number = index + 1
            const isActive = activeScreen === number
            return (
              <button key={number} type="button" onClick={() => setActiveScreen(number)} className={`flex h-9 min-w-24 items-center justify-center border-b-[3px] px-4 text-xs font-medium transition-colors ${isActive ? "border-emerald-500 text-violet-800" : "border-transparent text-muted-foreground hover:bg-violet-50 hover:text-violet-700"}`}>
                {number === 1 ? "Home" : `Screen ${number}`}
              </button>
            )
          })}
        </div>
        <div className="relative flex h-12 shrink-0 items-center justify-center gap-1 border-b border-violet-100/70 bg-[#faf7ff]/80">
          <button type="button" aria-label="Select tool" className="flex size-8 items-center justify-center rounded-lg bg-violet-700 text-white shadow-sm"><ChevronRight className="size-4 -rotate-45" /></button>
          <button type="button" aria-label="Pan canvas" className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-violet-100 hover:text-violet-700"><Hand className="size-4" /></button>
          <span className="mx-2 h-5 w-px bg-violet-200" />
          <button type="button" aria-label="Duplicate screen" className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-violet-100 hover:text-violet-700"><Copy className="size-4" /></button>
          <button type="button" aria-label="Add screen" onClick={() => setScreenCount((current) => { const next = current + 1; setActiveScreen(next); return next })} className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-violet-100 hover:text-violet-700"><Plus className="size-4" /></button>
          <button type="button" aria-label="Preview screens" className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-violet-100 hover:text-violet-700"><Play className="size-4" /></button>
          <span className="mx-2 h-5 w-px bg-violet-200" />
          <button type="button" aria-label="Undo" className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-violet-100 hover:text-violet-700"><Undo2 className="size-4" /></button>
          <button type="button" aria-label="Redo" className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-violet-100 hover:text-violet-700"><Redo2 className="size-4" /></button>
          <div className="absolute right-3 flex rounded-lg border border-violet-100 bg-white/90 p-1 shadow-sm">
            <button type="button" onClick={() => setDevice("phone")} className={`flex items-center gap-1 rounded-md px-2 py-1.5 text-[10px] font-medium transition-colors ${device === "phone" ? "bg-violet-700 text-white" : "text-muted-foreground hover:bg-violet-100 hover:text-violet-700"}`}><Smartphone className="size-3" />Phone</button>
            <button type="button" onClick={() => setDevice("desktop")} className={`flex items-center gap-1 rounded-md px-2 py-1.5 text-[10px] font-medium transition-colors ${device === "desktop" ? "bg-violet-700 text-white" : "text-muted-foreground hover:bg-violet-100 hover:text-violet-700"}`}><Monitor className="size-3" />Desktop</button>
          </div>
        </div>

        <div className="flex min-h-0 flex-1">
        <main className="relative flex min-w-0 flex-1 items-center justify-center overflow-auto p-8">
          <div className="absolute left-5 top-5 hidden items-center gap-2 text-xs text-muted-foreground sm:flex"><span className="size-2 rounded-full bg-emerald-500" /><span>{screenName}</span></div>
          <div className="flex flex-col items-center gap-3 transition-all duration-300" style={{ transform: `scale(${zoom / 62})` }}>
            <div className="flex items-center gap-2 text-xs font-medium text-violet-800">
              {device === "phone" ? <Smartphone className="size-3.5" /> : <Monitor className="size-3.5" />}
              <span>{screenName}</span>
              <button type="button" aria-label="Rename screen" className="rounded p-1 text-muted-foreground hover:bg-violet-100 hover:text-violet-700"><PenLine className="size-3" /></button>
            </div>
            <div className={`relative overflow-hidden border-[5px] border-[#28242f] bg-[#fffaff] shadow-[0_18px_35px_rgba(51,37,67,0.2)] transition-all duration-300 ${device === "phone" ? "h-[430px] w-[230px] rounded-[25px]" : "h-[280px] w-[540px] rounded-[18px]"}`}>
              <ScreenPreview screen={screenName} device={device} />
            </div>
          </div>

          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-xl border border-violet-100 bg-white/90 p-1.5 shadow-[0_5px_20px_rgba(84,50,120,0.1)] backdrop-blur">
            <button type="button" aria-label="Decrease zoom" onClick={() => changeZoom(-5)} className="flex size-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-violet-100 hover:text-violet-700"><Minus className="size-3.5" /></button>
            <button type="button" onClick={() => setZoom(62)} className="min-w-12 rounded-lg px-2 py-1 text-xs font-semibold text-violet-800 hover:bg-violet-100">{zoom}%</button>
            <button type="button" aria-label="Increase zoom" onClick={() => changeZoom(5)} className="flex size-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-violet-100 hover:text-violet-700"><Plus className="size-3.5" /></button>
            <button type="button" aria-label="Fit canvas" onClick={() => setZoom(62)} className="flex size-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-violet-100 hover:text-violet-700"><Maximize2 className="size-3.5" /></button>
          </div>

        </main>
        </div>
      </div>
    </div>
  )
}

function ScreenPreview({ screen, device }: { screen: string; device: "phone" | "desktop" }) {
  const title = screen
  return (
    <div className={`flex h-full flex-col bg-[#fffaff] ${device === "desktop" ? "text-[11px]" : "text-[9px]"}`}>
      <div className="flex items-center justify-between border-b border-violet-100 px-3 py-2 font-semibold text-violet-950"><span className="flex items-center gap-2"><Menu className="size-3" />{title}</span><MoreHorizontal className="size-3" /></div>
      <div className="flex gap-1.5 px-3 py-2"><button type="button" className="rounded-full bg-violet-700 px-3 py-1.5 text-[8px] font-semibold text-white">Favorite</button><button type="button" className="rounded-full border border-violet-300 px-3 py-1.5 text-[8px] font-semibold text-violet-800">Share</button></div>
      <div className="space-y-1 px-2">{listItems.map(([name, detail]) => <ListRow key={name} name={name} detail={detail} />)}</div>
      <button type="button" aria-label="Edit screen" className="mt-auto mr-2 self-end rounded-full bg-violet-200 p-2 text-violet-800 shadow-sm"><PenLine className="size-3" /></button>
      <div className="mt-2 grid grid-cols-4 border-t border-violet-100 bg-violet-50/80 py-2 text-center text-[7px] text-violet-800"><span>Home</span><span>Search</span><span>Saved</span><span>Settings</span></div>
    </div>
  )
}

function ListRow({ name, detail }: { name: string; detail: string }) {
  return <div className="flex items-center gap-2 rounded-xl bg-violet-100/60 px-2.5 py-2 text-violet-950"><span className="flex size-5 items-center justify-center rounded-full bg-violet-200">*</span><span className="flex-1"><strong className="block font-semibold">{name}</strong><small className="text-violet-800/65">{detail}</small></span><ChevronRight className="size-3" /></div>
}

