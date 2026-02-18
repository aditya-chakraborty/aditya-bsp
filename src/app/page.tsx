"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from "react";
import { Dialog, DropdownMenu, Switch, Tooltip } from "radix-ui";
import {
  BellIcon,
  CaretLeftIcon,
  ChatCircleIcon,
  CheckCircleIcon,
  CircleIcon,
  DotsThreeIcon,
  InfoIcon,
  LockSimpleIcon,
  MoonIcon,
  PlayIcon,
  PushPinIcon,
  SignOutIcon,
  SmileyIcon,
  SunIcon,
  XIcon,
} from "@phosphor-icons/react";
import "./page.css";

type Day = { id: number; label: string };

const dayList: Day[] = [
  { id: 1, label: "Day - 1" },
  { id: 2, label: "Day - 2" },
  { id: 3, label: "Day - 3" },
  { id: 4, label: "Day - 4" },
  { id: 5, label: "Day - 5" },
  { id: 6, label: "Day - 6" },
  { id: 7, label: "Day - 7" },
  { id: 8, label: "Day - 8" },
  { id: 9, label: "Day - 9" },
];

const baseDay = 2;
type ThemeMode = "light" | "dark";
const SIDEBAR_ROW_HEIGHT = 48;
const SIDEBAR_ROW_GAP = 12;

function isLocked(id: number, selectedDay: number) {
  return id > selectedDay;
}

function Logo({ theme }: { theme: ThemeMode }) {
  return (
    <div className="bp-logo">
      <img
        alt="BackstagePass"
        className="bp-logo-image"
        src={theme === "dark" ? "/BackstagePass LogoDark.svg" : "/bts_logo.svg"}
      />
    </div>
  );
}

function UserMenuDropdown({
  theme,
  onThemeToggle,
  onLogout,
}: {
  theme: ThemeMode;
  onThemeToggle: () => void;
  onLogout: () => void;
}) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="bp-avatar-trigger">
          <img
            alt="profile"
            className="bp-avatar-sm"
            src="/avatar.svg"
          />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content align="end" className="bp-user-menu-panel" sideOffset={8}>
          <div className="bp-theme-row">
            <div className="bp-theme-meta">
              <span>Theme</span>
              <strong>{theme === "dark" ? "Dark" : "Light"}</strong>
            </div>
            <Switch.Root
              aria-label="Toggle theme"
              checked={theme === "dark"}
              className="bp-theme-switch"
              onCheckedChange={onThemeToggle}
            >
              <Switch.Thumb className="bp-theme-switch-thumb">
                {theme === "dark" ? <MoonIcon size={13} /> : <SunIcon size={13} />}
              </Switch.Thumb>
            </Switch.Root>
          </div>
          <DropdownMenu.Item asChild>
            <button className="bp-logout-btn" onClick={onLogout} type="button">
              <SignOutIcon size={16} /> Logout
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

function Header({
  onInfo,
  theme,
  onThemeToggle,
}: {
  onInfo: () => void;
  theme: ThemeMode;
  onThemeToggle: () => void;
}) {
  return (
    <>
      <header className="bp-header-top">
        <Logo theme={theme} />
        <div className="bp-header-actions">
          <button className="bp-streak-pill">🔥 30</button>
          <Tooltip.Provider delayDuration={150}>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button className="bp-icon-btn">
                  <BellIcon size={16} />
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content className="bp-tooltip" side="bottom" sideOffset={8}>
                  Notifications
                  <Tooltip.Arrow className="bp-tooltip-arrow" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
          <UserMenuDropdown
            onLogout={() => {
              // UI-only assignment action placeholder.
              alert("Logged out");
            }}
            onThemeToggle={() => onThemeToggle()}
            theme={theme}
          />
        </div>
      </header>
      <header className="bp-header-sub">
        <div className="bp-header-sub-left">
          <button className="bp-back-btn">
            <CaretLeftIcon size={18} /> Back
          </button>
          <span className="bp-divider-vertical" />
          <p className="bp-day-title">Day 2 of 9</p>
        </div>
        <button className="bp-header-title" onClick={onInfo}>
          9-Day Fitness Challenge{" "}
          <span>
            <InfoIcon size={20} />
          </span>
        </button>
      </header>
    </>
  );
}

function Sidebar({
  selectedDay,
  onDayClick,
}: {
  selectedDay: number;
  onDayClick: (id: number) => void;
}) {
  const index = dayList.findIndex((d) => d.id === selectedDay);
  const top = index < 0 ? 0 : index * (SIDEBAR_ROW_HEIGHT + SIDEBAR_ROW_GAP);

  return (
    <aside className="bp-sidebar">
      <div className="bp-sidebar-blur-top" />
      <div className="bp-sidebar-blur-bottom" />
      <div className="bp-sidebar-list">
        <div className="bp-day-indicator" style={{ transform: `translateY(${top}px)` }} />
        {dayList.map((day) => {
          const completed = day.id <= selectedDay;
          const locked = isLocked(day.id, selectedDay);
          const isPrevOfSelected = day.id === selectedDay - 1;
          const isNextOfSelected = day.id === selectedDay + 1;
          const rowClassName = [
            "bp-day-row",
            isPrevOfSelected ? "bp-day-row-prev" : "",
            isNextOfSelected ? "bp-day-row-next" : "",
            locked ? "cursor-not-allowed" : "",
          ]
            .filter(Boolean)
            .join(" ");
          return (
            <button className={rowClassName} key={day.id} onClick={() => onDayClick(day.id)} disabled={locked}>
              <span className={day.id === selectedDay ? "bp-day-text active" : "bp-day-text"}>
                {day.label}
              </span>
              <span className="bp-day-icon">
                {locked ? (
                  <LockSimpleIcon size={18} weight="fill" />
                ) : completed ? (
                  <CheckCircleIcon size={18} weight="fill" color="var(--check-green)" />
                ) : (
                  <CircleIcon size={18} />
                )}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

function SubmissionCard() {
  return (
    <section className="bp-submission-wrap">
      <div className="bp-submission-head">Your Submission</div>
      <article className="bp-card">
        <div className="bp-card-profile">
          <img
            alt="Ashraf Idrishi"
            className="bp-avatar"
            src="/avatar.svg"
          />
          <div className="bp-profile-meta">
            <p className="bp-name">Ashraf Idrishi</p>
            <p className="bp-time">1d</p>
          </div>
          <button className="bp-more">
            <DotsThreeIcon size={20} weight="bold" />
          </button>
        </div>
        <p className="bp-text">Today&apos;s challenge workout completed-feeling stronger already</p>
        <div className="bp-media">
          <img
            alt="Workout media"
            src="https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1280&q=80"
          />
          <button className="bp-play">
            <PlayIcon size={20} weight="fill" />
          </button>
        </div>
        <div className="bp-reaction-row">
          <div className="bp-reactions">
            <span className="bp-reaction-pill">🙏 😍 18</span>
            <button className="bp-circle-btn">
              <SmileyIcon size={18} />
            </button>
            <button className="bp-circle-btn">
              <ChatCircleIcon size={18} />
            </button>
          </div>
          <p>10 Comments</p>
        </div>
      </article>
    </section>
  );
}

function SharedSection() {
  return (
    <section className="bp-shared">
      <div className="bp-shared-header">
        <p className="bp-shared-title">See what others shared</p>
        <p className="bp-shared-sub"><strong>85+</strong> participants already completed</p>
      </div>
      <article className="bp-card">
        <div className="bp-pinned">
          <PushPinIcon size={13} weight="fill" /> This is a pinned post
        </div>
        <div className="bp-card-profile">
          <img
            alt="Russell Brunson"
            className="bp-avatar"
            src="https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&w=96&q=80"
          />
          <div className="bp-profile-meta">
            <p className="bp-name">Russell Brunson</p>
            <p className="bp-time">3 hrs ago</p>
          </div>
          <button className="bp-more">
            <DotsThreeIcon size={20} weight="bold" />
          </button>
        </div>
        <div className="bp-shared-content">
          <p>
            This 9-day fitness challenge is designed to help you build consistency, boost energy,
            and feel stronger-one day at a time. Each day comes with a simple, achievable fitness
            task that fits easily into your routine, no matter your current fitness level.
          </p>
          <p>1️⃣ Minimum 20 minutes of sit-up</p>
          <p>2️⃣ Mention Intensity</p>
          <p>3️⃣ Upload Media (Optional)</p>
        </div>
      </article>
    </section>
  );
}

function Drawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog.Root onOpenChange={(nextOpen) => !nextOpen && onClose()} open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="bp-drawer-overlay" />
        <Dialog.Content aria-describedby="challenge-description-text" className="bp-drawer">
          <header className="bp-drawer-header">
            <Dialog.Close asChild>
              <button aria-label="Close challenge description" className="bp-close">
                <XIcon size={18} />
              </button>
            </Dialog.Close>
            <Dialog.Title asChild>
              <h2 className="bp-drawer-title">Challenge Description</h2>
            </Dialog.Title>
          </header>
          <section className="bp-drawer-body">
            <img
              alt="Challenge cover"
              className="bp-drawer-cover"
              src="https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1200&q=80"
            />
            <h3 className="bp-drawer-challenge-title">9-Day Fitness Challenge</h3>
            <dl className="bp-stats">
              <div>
                <dt>Total Checkins</dt>
                <dd>9</dd>
              </div>
              <div>
                <dt>Participants Joined</dt>
                <dd>75</dd>
              </div>
            </dl>
            <h4 className="bp-desc-label">Description</h4>
            <p className="bp-desc" id="challenge-description-text">
              This 9-day challenge is designed to help you build the habit of showing up every
              day. You&apos;ll complete one small, focused action daily-without overwhelm-to build
              clarity and confidence, and to prove that consistency, not motivation, is what drives
              real and lasting progress.
            </p>
          </section>
          <footer className="bp-drawer-footer">
            <Dialog.Close asChild>
              <button className="bp-got-it">Got it</button>
            </Dialog.Close>
          </footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default function Home() {
  const [selectedDay, setSelectedDay] = useState(baseDay);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") {
      return "light";
    }
    const saved = window.localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") {
      return saved;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  const normalizedDay = useMemo(() => Math.max(2, Math.min(9, selectedDay)), [selectedDay]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="bp-page">
      <Header
        onInfo={() => setDrawerOpen(true)}
        onThemeToggle={() => setTheme((old) => (old === "dark" ? "light" : "dark"))}
        theme={theme}
      />
      <div className="bp-main">
        <Sidebar onDayClick={setSelectedDay} selectedDay={normalizedDay} />
        <section className="bp-content-pane">
          <div className="bp-feed-col">
            <SubmissionCard />
            <SharedSection />
          </div>
        </section>
      </div>
      <Drawer onClose={() => setDrawerOpen(false)} open={drawerOpen} />
    </div>
  );
}
