import { createFileRoute } from '@tanstack/react-router'
import {
    Timeline,
    TimelineContent,
    TimelineDate,
    TimelineHeader,
    TimelineIndicator,
    TimelineItem,
    TimelineSeparator,
    TimelineTitle,
  } from "@/components/ui/timeline"
import { roadmapList } from '@/lib/roadmap'

export const Route = createFileRoute('/roadmap')({
    component: RouteComponent,
})


function RouteComponent() {
    return <div>
        <Timeline defaultValue={2}>
            {roadmapList.map((item) => (
                <TimelineItem key={item.id} step={item.id}>
                    <TimelineHeader>
                        <TimelineSeparator />
                        <TimelineTitle className="-mt-0.5">{item.title}</TimelineTitle>
                        <TimelineIndicator />
                    </TimelineHeader>
                    <TimelineContent>
                        {item.description}
                        <TimelineDate className="mt-2 mb-0">{item.date}</TimelineDate>
                    </TimelineContent>
                </TimelineItem>
            ))}
        </Timeline>
    </div>
}
