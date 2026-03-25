import { format } from "date-fns";
import { PageHeading } from "@/components/page-heading";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockMessages, mockThreads, userById } from "@/lib/mock-data";

const DEMO_USER = "u-student-1";

export default function StudentChatPage() {
  const thread = mockThreads[0];
  const messages = mockMessages
    .filter((m) => m.thread_id === thread?.id)
    .sort(
      (a, b) => new Date(a.sent_at).getTime() - new Date(b.sent_at).getTime()
    );

  return (
    <div className="space-y-6">
      <PageHeading
        title="Chat"
        description="Read-only transcript preview — compose UI ships with realtime transport."
      />
      <Card className="overflow-hidden">
        <div className="border-b px-4 py-3">
          <p className="font-medium">{thread?.title ?? "Conversation"}</p>
          <p className="text-xs text-muted-foreground">Mock thread</p>
        </div>
        <ScrollArea className="h-[420px] p-4">
          <div className="space-y-4">
            {messages.map((m) => {
              const sender = userById(m.sender_id);
              const mine = m.sender_id === DEMO_USER;
              return (
                <div
                  key={m.id}
                  className={`flex gap-3 ${mine ? "flex-row-reverse text-right" : ""}`}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {sender?.full_name?.slice(0, 2) ?? "??"}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                      mine
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-xs font-medium opacity-80">
                      {sender?.full_name ?? "Unknown"}
                    </p>
                    <p className="mt-1">{m.body}</p>
                    <p className="mt-1 text-[10px] opacity-70">
                      {format(new Date(m.sent_at), "p")}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}
