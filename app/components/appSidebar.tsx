"use client"

import {
  ArrowDownUp,
  Box,
  Check,
  CircleDot,
  Component,
  ChevronRight,
  FileText,

  Grid2X2,
  LayoutGrid,
  List,
  Menu,
  Puzzle,
  Layers3,
  Palette,
  Search,
  SlidersHorizontal,
  Shapes,
  Square,
  Sun,
  Type,
  Trash2,
  WandSparkles,
  Sparkles,
} from "lucide-react"

import { useState } from "react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { useScreens } from "./screenContext"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const sections = [
  {
    title: "Parts",
    icon: Puzzle,
  },
  {
    title: "Layers",
    icon: Layers3,
  },
  {
    title: "Colors",
    icon: Palette,
  },
  {
    title: "Shapes",
    icon: Shapes,
  },
  {
    title: "Types",
    icon: Type,
  },
  {
    title: "Motions",
    icon: WandSparkles,
  },
]

const groups = [
  {
    title: "Actions",
    items: [
      { title: "Button", icon: Square },
      { title: "Icon Button", icon: CircleDot },
      { title: "FAB", icon: CircleDot },
      { title: "Split Button", icon: ArrowDownUp },
    ],
  },
  {
    title: "Navigation",
    items: [
      { title: "Top App Bar", icon: Menu },
      { title: "Navigation Rail", icon: LayoutGrid },
      { title: "Tabs", icon: Component },
      { title: "Search Bar", icon: Search },
    ],
  },
  {
    title: "Containment",
    items: [
      { title: "Card", icon: Box },
      { title: "List Item", icon: List },
      { title: "Grid", icon: Grid2X2 },
    ],
  },
]

const typefaces = ["Roboto", "Roboto Flex", "Roboto Serif", "System"]

const colorPalettes = [
  { name: "Purple", colors: ["#5533a5", "#d9cdf2", "#eee9f8", "#f7d9e2"] },
  { name: "Blue", colors: ["#0756d6", "#b9d5ff", "#dbeaff", "#f0cfe2"] },
  { name: "Green", colors: ["#087544", "#a9e5bd", "#d9f5df", "#f2d9c8"] },
  { name: "Coral", colors: ["#9c2855", "#f3b8c8", "#f9d5df", "#f3d4c9"] },
  { name: "Amber", colors: ["#9b4f05", "#f4c28f", "#f8e1b5", "#d9e3b7"] },
  { name: "Teal", colors: ["#006d73", "#a8e5e6", "#cceff0", "#c8def0"] },
  { name: "Mono", colors: ["#292532", "#c5bfce", "#e3dfe8", "#f5f3f7"] },
]

export function AppSidebar() {
  const [activeSection, setActiveSection] = useState("Parts")
  const [selectedPalette, setSelectedPalette] = useState("Purple")
  const [dynamicColor, setDynamicColor] = useState(false)
  const { screenCount, activeScreen, selectScreen, deleteScreen } = useScreens()

  return (
    <Sidebar collapsible="icon" className="w-[14rem] border-r-0 bg-[#fbf7ff] text-[#27232f]">
      <SidebarContent className="flex-row gap-0 overflow-hidden p-0">
        <nav className="flex w-11 shrink-0 flex-col items-center border-r border-violet-100/80 bg-[#f3edfb] py-3" aria-label="Workspace tools">
          <button type="button" aria-label="VibeCraft home" className="relative mb-5 flex size-7 items-center justify-center rounded-lg bg-violet-700 text-white shadow-sm transition-transform duration-200 hover:scale-105">
            <Palette className="size-4" />
            <Sparkles className="absolute -right-1 -top-1 size-2.5 fill-white" />
          </button>
          <div className="flex flex-col gap-2">
            {sections.map((section) => {
              const isActive = activeSection === section.title
              return (
                <button
                  key={section.title}
                  type="button"
                  aria-label={section.title}
                  aria-pressed={isActive}
                  onClick={() => setActiveSection(section.title)}
                  className={`group relative flex size-8 items-center justify-center rounded-lg transition-all duration-200 ${isActive ? "bg-violet-700 text-white shadow-md shadow-violet-700/20" : "text-violet-900/55 hover:bg-violet-200/70 hover:text-violet-800"}`}
                >
                  <section.icon className="size-4 transition-transform duration-200 group-hover:scale-110" />
                  {isActive && <span className="absolute -right-[7px] h-4 w-0.5 rounded-full bg-violet-700" />}
                </button>
              )
            })}
          </div>
          
        </nav>

        <div className="flex min-w-0 flex-1 flex-col">
          <SidebarHeader className="h-12 shrink-0 justify-center border-b border-violet-100/80 px-3 py-0">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold">{activeSection}</span>
              <SidebarTrigger aria-label="Collapse sidebar" className="size-6 rounded p-1 text-violet-900/45 hover:bg-violet-100 hover:text-violet-800"><ChevronRight className="size-3.5 rotate-180" /></SidebarTrigger>
            </div>
          </SidebarHeader>

          <div className="flex-1 overflow-y-auto">
            {activeSection === "Parts" ? (
              <SidebarGroup className="px-2 py-3">
                <div className="relative mb-3">
                  <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search" className="h-8 rounded-xl border-0 bg-violet-100/65 pl-8 text-[11px] shadow-none focus-visible:ring-1 focus-visible:ring-violet-400" />
                </div>
                <SidebarGroupContent>
                  <Accordion defaultValue={["actions", "navigation", "containment"]} className="gap-1">
                    {groups.map((group) => (
                      <AccordionItem key={group.title} value={group.title.toLowerCase()} className="border-b-0">
                        <AccordionTrigger className="px-1 py-2 text-[10px] font-semibold text-violet-950 hover:no-underline dark:text-violet-200">
                          {group.title}
                        </AccordionTrigger>
                        <AccordionContent className="pb-1">
                          <div className="grid grid-cols-2 gap-1.5">
                            {group.items.map((item) => (
                              <button key={item.title} type="button" className="group flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl bg-violet-100/55 px-1 text-[9px] font-medium text-violet-950/70 transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-200/80 hover:text-violet-900 hover:shadow-sm dark:bg-violet-950/30 dark:text-violet-200/70 dark:hover:bg-violet-900/50">
                                <item.icon className="size-4 text-violet-700 transition-transform duration-200 group-hover:scale-110 dark:text-violet-300" />
                                <span className="text-center leading-tight">{item.title}</span>
                              </button>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </SidebarGroupContent>
              </SidebarGroup>
            ) : activeSection === "Colors" ? (
              <SidebarGroup className="px-2 py-3">
                <div className="space-y-1">
                  <button type="button" className="flex w-full items-center gap-2 rounded-xl bg-violet-100/70 px-2.5 py-2 text-left text-[11px] font-semibold text-violet-950 dark:text-violet-200"><Sun className="size-3.5" />Brightness<span className="ml-auto text-[10px] font-medium text-violet-700">Light <ChevronRight className="ml-1 inline size-3" /></span></button>
                  <div className="flex items-center justify-between rounded-xl px-2.5 py-2 text-[11px] font-semibold text-violet-950 dark:text-violet-200"><span className="flex items-center gap-2"><CircleDot className="size-3.5" />Both</span><button type="button" aria-label="Toggle both colors" className="relative h-5 w-9 rounded-full bg-violet-300"><span className="absolute left-0.5 top-0.5 size-4 rounded-full bg-white shadow-sm" /></button></div>
                  <button type="button" className="flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-left text-[11px] font-semibold text-violet-950 hover:bg-violet-100/70 dark:text-violet-200"><SlidersHorizontal className="size-3.5" />Contrast<span className="ml-auto text-[10px] font-medium text-violet-700">Standard <ChevronRight className="ml-1 inline size-3" /></span></button>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-1 rounded-xl bg-violet-100/70 p-1">
                  <button type="button" className="rounded-lg bg-violet-900 px-2 py-2 text-[10px] font-semibold text-white">Palettes</button>
                  <button type="button" className="rounded-lg px-2 py-2 text-[10px] font-medium text-muted-foreground hover:bg-white/70">Custom</button>
                </div>
                <div className="mt-2 space-y-1">
                  {colorPalettes.map((palette) => (
                    <button key={palette.name} type="button" onClick={() => setSelectedPalette(palette.name)} className={`flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left transition-colors ${selectedPalette === palette.name ? "bg-violet-200/80 text-violet-950" : "text-violet-950/75 hover:bg-violet-100 dark:text-violet-200/75"}`}>
                      <span className="size-5 rounded-full" style={{ background: `linear-gradient(135deg, ${palette.colors[0]} 50%, ${palette.colors[1]} 50%)` }} />
                      <span className="w-14 text-[10px] font-semibold">{palette.name}</span>
                      <span className="ml-auto flex gap-0.5">{palette.colors.map((color) => <span key={color} className="size-3.5 rounded-full border border-white/70" style={{ backgroundColor: color }} />)}</span>
                    </button>
                  ))}
                </div>
                <button type="button" onClick={() => setDynamicColor((current) => !current)} className="mt-3 flex w-full items-center gap-2 rounded-xl bg-violet-100/60 px-2.5 py-3 text-left text-violet-950/75 dark:bg-violet-950/30 dark:text-violet-200/75"><span className="flex size-6 items-center justify-center rounded-lg bg-violet-200"><CircleDot className="size-3.5" /></span><span className="flex-1"><span className="block text-[10px] font-semibold">Dynamic color</span><span className="block text-[9px]">Uses wallpaper colors</span></span><span className={`relative h-5 w-9 rounded-full transition-colors ${dynamicColor ? "bg-violet-700" : "bg-violet-300"}`}><span className={`absolute top-0.5 size-4 rounded-full bg-white shadow-sm transition-transform ${dynamicColor ? "translate-x-4" : "left-0.5"}`} /></span></button>
              </SidebarGroup>
            ) : activeSection === "Layers" ? (
              <SidebarGroup className="px-2 py-3">
                <p className="px-1 pb-3 text-[10px] font-semibold text-violet-950 dark:text-violet-200">Screens</p>
                <div className="space-y-1">
                  {Array.from({ length: screenCount }, (_, index) => {
                    const number = index + 1
                    const name = number === 1 ? "Home" : `Screen ${number}`
                    const isActive = activeScreen === number
                    return (
                      <div key={number} className={`flex items-center rounded-xl border-l-2 transition-colors ${isActive ? "border-emerald-500 bg-violet-100/80" : "border-transparent hover:bg-violet-100/60"}`}>
                        <button type="button" onClick={() => selectScreen(number)} className="flex min-w-0 flex-1 items-center gap-2 px-2.5 py-2 text-left text-[11px] font-medium text-violet-950 dark:text-violet-200">
                          <FileText className="size-3.5 shrink-0 text-violet-700" />
                          <span className="truncate">{name}</span>
                        </button>
                        <button type="button" aria-label={`Delete ${name}`} disabled={screenCount === 1} onClick={() => deleteScreen(number)} className="mr-1 rounded p-1 text-muted-foreground hover:bg-red-100 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-30"><Trash2 className="size-3" /></button>
                      </div>
                    )
                  })}
                </div>
              </SidebarGroup>
            ) : activeSection === "Types" ? (
              <SidebarGroup className="px-2 py-3">
                <p className="px-1 pb-3 text-[10px] font-semibold text-violet-950 dark:text-violet-200">Typeface</p>
                <div className="space-y-1">
                  {typefaces.map((typeface, index) => (
                    <button key={typeface} type="button" className={`flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-left transition-colors ${index === 0 ? "bg-violet-200/80 text-violet-950" : "text-violet-950/75 hover:bg-violet-100 dark:text-violet-200/75 dark:hover:bg-violet-950/40"}`}>
                      <span className="text-base font-semibold leading-none">Aa</span>
                      <span className="text-[11px] font-medium">{typeface}</span>
                      {index === 0 && <Check className="ml-auto size-3.5" />}
                    </button>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between rounded-xl bg-violet-100/60 px-2.5 py-3 text-violet-950/75 dark:bg-violet-950/30 dark:text-violet-200/75">
                  <div>
                    <p className="text-[11px] font-semibold">Emphasized</p>
                    <p className="text-[9px]">Heavier expressive styles</p>
                  </div>
                  <span className="relative h-5 w-9 rounded-full bg-violet-300"><span className="absolute left-0.5 top-0.5 size-4 rounded-full bg-white shadow-sm" /></span>
                </div>
              </SidebarGroup>
            ) : activeSection === "Motions" ? (
              <SidebarGroup className="px-2 py-3">
                <p className="px-1 pb-3 text-[10px] font-semibold text-violet-950 dark:text-violet-200">Motion scheme</p>
                <div className="grid grid-cols-2 gap-1.5">
                  <button type="button" className="rounded-xl border border-violet-700 bg-violet-100 px-2 py-3 text-violet-950 shadow-sm dark:bg-violet-950/50 dark:text-violet-200">
                    <svg viewBox="0 0 54 22" className="mb-2 h-6 w-full fill-none stroke-violet-700 stroke-2 dark:stroke-violet-300"><path d="M2 19C15 18 16 4 28 4s12 9 24-2" /></svg>
                    <span className="text-[10px] font-semibold">Standard</span>
                  </button>
                  <button type="button" className="rounded-xl bg-violet-100/65 px-2 py-3 text-violet-950/75 transition-colors hover:bg-violet-200/80 dark:bg-violet-950/30 dark:text-violet-200/75">
                    <svg viewBox="0 0 54 22" className="mb-2 h-6 w-full fill-none stroke-violet-600 stroke-2 dark:stroke-violet-300"><path d="M2 17C12 20 14 2 24 8s15 12 28-6" /></svg>
                    <span className="text-[10px] font-semibold">Expressive</span>
                  </button>
                </div>
                <p className="mt-3 px-1 text-[9px] leading-relaxed text-violet-950/60 dark:text-violet-200/60">Expressive is a bouncy spring that drives transitions and prompts.</p>
                <button type="button" aria-label="Preview motion" className="mx-auto mt-4 flex size-8 items-center justify-center rounded-full bg-violet-700 text-white shadow-md transition-transform hover:scale-105"><ChevronRight className="size-4" /></button>
              </SidebarGroup>
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-2 px-5 text-center text-violet-900/60">
                <ActiveSectionIcon section={activeSection} />
                <p className="text-xs font-medium">{activeSection} tools</p>
                <p className="text-[10px] leading-relaxed">Select a tool from this panel to begin designing.</p>
              </div>
            )}
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}

function ActiveSectionIcon({ section }: { section: string }) {
  const Icon = sections.find((item) => item.title === section)?.icon ?? Puzzle
  return <Icon className="size-6 text-violet-600" />
}