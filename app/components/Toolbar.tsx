"use client"

import {
  CopyPlus,
  FolderUp,
  Hand,
  Monitor,
  MousePointer2,
  Play,
  Redo2,
  Smartphone,
  Trash2,
  Undo2,
} from "lucide-react"
import { useState } from "react"

type Device = "phone" | "desktop"

type ToolbarProps = {
  screenCount: number
  activeScreen: number
  device: Device
  onAddScreen: () => void
  onDeleteScreen: (screen: number) => void
  onDeviceChange: (device: Device) => void
  onUndo: () => void
  onRedo: () => void
  canUndo: boolean
  canRedo: boolean
  onToolChange: (tool: "select" | "pan") => void
}

export function Toolbar({ screenCount, activeScreen, device, onAddScreen, onDeleteScreen, onDeviceChange, onUndo, onRedo, canUndo, canRedo, onToolChange }: ToolbarProps) {
  const [activeTool, setActiveTool] = useState("select")
  const toolClass = (tool: string) => `flex size-8 items-center justify-center rounded-lg transition-all duration-200 ease-out ${activeTool === tool ? "scale-105 bg-violet-700 text-white shadow-sm" : "text-muted-foreground hover:bg-violet-100 hover:text-violet-700"}`
  const selectTool = (tool: "select" | "pan") => {
    setActiveTool(tool)
    onToolChange(tool)
  }

  return (
    <div className="relative flex h-12 min-h-12 shrink-0 items-center justify-center overflow-x-auto border-b border-violet-100/70 bg-[#faf7ff]/80 px-3">
      <div className="flex min-w-max shrink-0 items-center gap-2 pr-36">
      <div className="flex shrink-0 rounded-xl border border-violet-100 bg-white/90 p-1 shadow-sm">
        <button type="button" aria-label="Select tool" aria-pressed={activeTool === "select"} onClick={() => selectTool("select")} className={toolClass("select")}><MousePointer2 className="size-4" /></button>
        <button type="button" aria-label="Pan canvas" aria-pressed={activeTool === "pan"} onClick={() => selectTool("pan")} className={toolClass("pan")}><Hand className="size-4" /></button>
      </div>
      <div className="flex shrink-0 rounded-xl border border-violet-100 bg-white/90 p-1 shadow-sm">
        <button type="button" aria-label="Duplicate and add screen" aria-pressed={activeTool === "copy"} onClick={() => { setActiveTool("copy"); onAddScreen() }} className={toolClass("copy")}><CopyPlus className="size-4" /></button>
        <button type="button" aria-label="Preview screens" aria-pressed={activeTool === "play"} onClick={() => setActiveTool("play")} className={toolClass("play")}><Play className="size-4" /></button>
      </div>
      <div className="flex shrink-0 rounded-xl border border-violet-100 bg-white/90 p-1 shadow-sm">
        <button type="button" aria-label="Undo" aria-pressed={activeTool === "undo"} disabled={!canUndo} onClick={() => { setActiveTool("undo"); onUndo() }} className={`${toolClass("undo")} disabled:cursor-not-allowed disabled:opacity-30`}><Undo2 className="size-4" /></button>
        <button type="button" aria-label="Redo" aria-pressed={activeTool === "redo"} disabled={!canRedo} onClick={() => { setActiveTool("redo"); onRedo() }} className={`${toolClass("redo")} disabled:cursor-not-allowed disabled:opacity-30`}><Redo2 className="size-4" /></button>
      </div>
      <div className="flex shrink-0 rounded-xl border border-violet-100 bg-white/90 p-1 shadow-sm">
        <button type="button" aria-label="Delete active screen" aria-pressed={activeTool === "delete"} disabled={screenCount === 1} onClick={() => { setActiveTool("delete"); onDeleteScreen(activeScreen) }} className={`${toolClass("delete")} hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-30`}><Trash2 className="size-4" /></button>
        <label htmlFor="toolbar-upload" aria-label="Upload folder" onClick={() => setActiveTool("upload")} className={toolClass("upload")}><FolderUp className="size-4" /><span className="sr-only">Upload folder</span></label>
        <input id="toolbar-upload" type="file" className="sr-only" />
      </div>
      </div>
      <div className="absolute right-3 z-10 flex rounded-lg border border-violet-100 bg-white/95 p-1 shadow-sm">
        <button type="button" onClick={() => onDeviceChange("phone")} className={`flex items-center gap-1 rounded-md px-2 py-1.5 text-[10px] font-medium transition-colors ${device === "phone" ? "bg-violet-700 text-white" : "text-muted-foreground hover:bg-violet-100 hover:text-violet-700"}`}><Smartphone className="size-3" />Phone</button>
        <button type="button" onClick={() => onDeviceChange("desktop")} className={`flex items-center gap-1 rounded-md px-2 py-1.5 text-[10px] font-medium transition-colors ${device === "desktop" ? "bg-violet-700 text-white" : "text-muted-foreground hover:bg-violet-100 hover:text-violet-700"}`}><Monitor className="size-3" />Desktop</button>
      </div>
    </div>
  )
}
