// src/config/navigation.js
// Public navigation links (visible to all users)
// { label: "Home", href: "/", icon: <Home size={18} /> },
import {
  Eye,
  EyeOff,
  LogIn,
  Building2,
  Mail,
  Lock,
  AlertCircle,
  Home,
  BarChart3,
  Users,
  Phone,
  LayoutDashboard,
  UserPlus,
  UserStar,
  CalendarClock,
  NotebookPen,
  ReceiptIndianRupee,
  IndianRupee,
  ShieldUser,
  ClipboardPenLine,
  ChartNoAxesCombined,
  UserCog,
} from "lucide-react";

export const publicNavLinks = [
  { label: "Home", href: "/", icon: <Home size={18} /> },
  { label: "Features", href: "/features", icon: <BarChart3 size={18} /> },
  { label: "Franchises", href: "/franchises", icon: <Building2 size={18} /> },
  { label: "Partners", href: "/partners", icon: <Users size={18} /> },
  { label: "Contact", href: "/contact", icon: <Phone size={18} /> },
];

// Role-based navigation links
export const roleBasedNavLinks = {
  SuperAdmin: [
    { label: "Home", href: "/", icon: <Home size={18} /> },
    {
      href: "/add-client",
      label: "Add Client",
      icon: <ShieldUser size={18} />,
    },
    {
      href: "/author/my-submissions",
      label: "My Submissions",
      icon: <Home size={18} />,
    },
    // { href: "/author/submit-paper", label: "Submit Paper" ,icon: <Home size={18} />},
    { href: "/profile", label: "Profile", icon: <Home size={18} /> },
    { href: "/guidelines", label: "Guidelines", icon: <Home size={18} /> },
    // { href: "/author/review-status", label: "Review Status" ,icon: <Home size={18} />},
    // { href: "/author/co-authors", label: "Co-Authors" ,icon: <Home size={18} />},
  ],
  // Author specific links
  Admin: [
    { label: "Home", href: "/", icon: <Home size={18} /> },
    {
      href: "/fee-details",
      label: "Fee-Details",
      icon: <ClipboardPenLine size={18} />,
    },
    {
      href: "/admin-manager",
      label: "Manager",
      icon: <UserCog size={18} />,
    },
    // { href: "/author/submit-paper", label: "Submit Paper" ,icon: <Home size={18} />},
    {
      href: "/profile",
      label: "stats",
      icon: <ChartNoAxesCombined size={18} />,
    },
    // { href: "/guidelines", label: "Guidelines", icon: <Home size={18} /> },
    // { href: "/author/review-status", label: "Review Status" ,icon: <Home size={18} />},
    // { href: "/author/co-authors", label: "Co-Authors" ,icon: <Home size={18} />},
  ],

  // Reviewer specific links
  Manager: [
    { label: "Home", href: "/", icon: <Home size={18} /> },
    {
      href: "/reviewer",
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      href: "/manager/add-users",
      label: "Add users",
      icon: <UserPlus size={18} />,
    },
    // { href: "/reviewer/review-history", label: "Review History" ,icon: <Home size={18} />},
    // { href: "/reviewer/guidelines", label: "Review Guidelines" ,icon: <Home size={18} />},
    // { href: "/reviewer/availability", label: "Availability" ,icon: <Home size={18} />},
  ],

  // Editorial specific links
  Franchise: [
    { label: "Home", href: "/", icon: <Home size={18} /> },
    {
      href: "/editorial",
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      href: "/franchise/add-lead",
      label: "Lead",
      icon: <UserStar size={18} />,
    },
    {
      href: "/franchise/installment-payment/list",
      label: "Installments",
      icon: <IndianRupee size={18} />,
    },
    {
      href: "/franchise/my-lead-list",
      label: "Enrollment",
      icon: <NotebookPen size={18} />,
    },
    // {
    //   href: "/editorial/assign-reviewers",
    //   label: "Assign Reviewers",
    //   icon: <Home size={18} />,
    // },
    // {
    //   href: "/editorial/decisions",
    //   label: "Editorial Decisions",
    //   icon: <Home size={18} />,
    // },
    // {
    //   href: "/editorial/issue-management",
    //   label: "Issue Management",
    //   icon: <Home size={18} />,
    // },
  ],

  // Administrator specific links
  ChannelPartner: [
    { label: "Home", href: "/", icon: <Home size={18} /> },
    { href: "/administrator", label: "Dashboard", icon: <Home size={18} /> },
    {
      href: "/administrator/users",
      label: "User Management",
      icon: <Home size={18} />,
    },
    {
      href: "/administrator/system-settings",
      label: "System Settings",
      icon: <Home size={18} />,
    },
    {
      href: "/administrator/reports",
      label: "Reports & Analytics",
      icon: <Home size={18} />,
    },
    {
      href: "/administrator/backup",
      label: "Backup & Restore",
      icon: <Home size={18} />,
    },
  ],

  // Publisher specific links
  publisher: [
    { label: "Home", href: "/", icon: <Home size={18} /> },
    { href: "/publisher", label: "Dashboard", icon: <Home size={18} /> },
    {
      href: "/publisher/publication-queue",
      label: "Publication Queue",
      icon: <Home size={18} />,
    },
    {
      href: "/publisher/issue-management",
      label: "Issue Management",
      icon: <Home size={18} />,
    },
    {
      href: "/publisher/archive",
      label: "Content Archive",
      icon: <Home size={18} />,
    },
    {
      href: "/publisher/statistics",
      label: "Publication Stats",
      icon: <Home size={18} />,
    },
  ],
};

// Common authenticated user links (visible to all logged-in users)
export const commonAuthLinks = [
  //   { href: "/profile", label: "My Profile" ,icon: <Home size={18} />},
  //   { href: "/settings", label: "Settings" ,icon: <Home size={18} />},
];
