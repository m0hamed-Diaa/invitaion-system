import {
  getDashboardStats,
} from "@/lib/actions/dashboard";

import DashboardStats from "@/components/admin/dashboard/DashboardStats";

import GuestStatusChart from "@/components/admin/dashboard/GuestStatusChart";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function AdminDashboard() {

  const stats =
    await getDashboardStats();

  return (
    <div className="space-y-6">

      <div className="sm:flex space-y-2 sm:space-y-0 items-center justify-between">
        <div>

          <h1 className="text-2xl font-bold">
            لوحة التحكم
          </h1>

          <p className="text-muted-foreground">
            نظرة عامة على نظام الدعوات الإلكترونية
          </p>

        </div>

        <div>
          <Link href="/admin/clients/new">
            <Button>
              انشاء عميل جديد
            </Button>
          </Link>
          <Link href="/admin/clients/new">
            <Button>
              انشاء مناسبة جديد
            </Button>
          </Link>
        </div>
      </div>

      <DashboardStats
        stats={{
          clients: stats.clients,
          events: stats.events,
          guests: stats.guests,
          attending: stats.attending,
          sending: stats.sent,
          notSending: stats.notSent
        }}
      />

      <div className="grid gap-6 lg:grid-cols-1">

        <GuestStatusChart
          attending={stats.attending}
          pending={stats.pending}
          declined={stats.declined}
        />

      </div>
    </div>
  );
}