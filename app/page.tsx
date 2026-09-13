"use client"

import {
  ChevronRight,
  Maximize2,
  Menu,
  Minus,
  Monitor,
  MoreHorizontal,
  PenLine,
  Plus,
  Smartphone,
} from "lucide-react"
import { useRef, useState, type PointerEvent } from "react"

import { Toolbar } from "./components/Toolbar"
import { useScreens } from "./components/screenContext"

const listItems = [
  ["Inbox", "Supporting text"],
  ["Archive", "Supporting text"],
  ["Starred", "Supporting text"],
]

export default function Home() {
  const [zoom, setZoom] = useState(62)
  const [device, setDevice] = useState<"phone" | "desktop">("phone")
  const [tool, setTool] = useState<"select" | "pan">("select")
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const panStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 })
  const { screenCount, activeScreen, addScreen, selectScreen, deleteScreen, undo, redo, canUndo, canRedo } = useScreens()
  const screenName = activeScreen === 1 ? "Home" : `Screen ${activeScreen}`

  function changeZoom(amount: number) {
    setZoom((current) => Math.min(120, Math.max(35, current + amount)))
  }

  function startPan(event: PointerEvent<HTMLElement>) {
    if (tool !== "pan") return
    panStart.current = { x: event.clientX, y: event.clientY, panX: pan.x, panY: pan.y }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function movePan(event: PointerEvent<HTMLElement>) {
    if (tool !== "pan" || !event.currentTarget.hasPointerCapture(event.pointerId)) return
    setPan({ x: panStart.current.panX + event.clientX - panStart.current.x, y: panStart.current.panY + event.clientY - panStart.current.y })
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#f8f4fc] text-[#292532]">
      <div className="flex min-h-0 flex-1 flex-col">
        <Toolbar
          screenCount={screenCount}
          activeScreen={activeScreen}
          device={device}
          onAddScreen={addScreen}
          onDeleteScreen={deleteScreen}
          onDeviceChange={setDevice}
          onUndo={undo}
          onRedo={redo}
          canUndo={canUndo}
          canRedo={canRedo}
          onToolChange={setTool}
        />

        <div className="flex min-h-0 flex-1">
        <main onPointerDown={startPan} onPointerMove={movePan} className={`relative flex min-w-0 flex-1 items-center justify-center overflow-auto p-8 transition-colors ${tool === "pan" ? "canvas-cursor-pan" : "canvas-cursor-select"}`}>
          <div className="absolute left-5 top-5 hidden items-center gap-2 text-xs text-muted-foreground sm:flex"><span className="size-2 rounded-full bg-emerald-500" /><span>{screenName}</span></div>
          <div className="flex items-start gap-14 transition-transform duration-75" style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom / 62})` }}>
            {Array.from({ length: screenCount }, (_, index) => {
              const number = index + 1
              const name = number === 1 ? "Home" : `Screen ${number}`
              const isActive = number === activeScreen
              return (
                <div key={number} onClick={() => { if (tool === "select") selectScreen(number) }} className="group flex shrink-0 cursor-pointer flex-col items-center gap-3 text-left">
                  <span className={`flex items-center gap-2 text-xs font-medium transition-colors ${isActive ? "text-violet-800" : "text-muted-foreground group-hover:text-violet-700"}`}>
                    {device === "phone" ? <Smartphone className="size-3.5" /> : <Monitor className="size-3.5" />}
                    {name}
                    <PenLine className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </span>
                  <div className={`relative overflow-hidden border-[5px] bg-[#fffaff] shadow-[0_18px_35px_rgba(51,37,67,0.2)] transition-all duration-300 ${device === "phone" ? "h-[430px] w-[230px] rounded-[25px]" : "h-[280px] w-[540px] rounded-[18px]"} ${isActive ? "border-violet-700" : "border-[#28242f]"}`}>
                    <ScreenPreview screen={name} device={device} />
                  </div>
                </div>
              )
            })}
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

