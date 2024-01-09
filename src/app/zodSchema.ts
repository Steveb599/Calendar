import dayjs, { Dayjs } from "dayjs"
import * as z from "zod"
const meetingSchema = z.object({
    startDate: z.custom<Dayjs>((val) => val instanceof dayjs, 'Invalid date'),
    title: z.string(),
    trainees: z.string().array().nonempty({
        message: "Can't be empty!",
    }),
    duration: z.number(),
    label: z.string(),
    type: z.enum(['Online', 'In person']),
    address: z.optional(z.string()),
    online: z.optional(z.enum(['Zoom', 'Skype', 'WhatsApp', 'Facebook', 'Instagram'])),
    notes: z.optional(z.string()),
    meetingType: z.enum(['Nutrition', 'Training', 'Nutrition and training']),
})


type TMeetingSchema = z.infer<typeof meetingSchema>;

export { meetingSchema }
export type { TMeetingSchema }