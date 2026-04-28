import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

export const contactRouter = router({
  submitForm: publicProcedure
    .input(contactFormSchema)
    .mutation(async ({ input }) => {
      try {
        // Validate input
        const validatedData = contactFormSchema.parse(input);

        // Send notification to owner
        const notificationTitle = `New Contact Form Submission from ${validatedData.name}`;
        const notificationContent = `
Email: ${validatedData.email}
Phone: ${validatedData.phone || "Not provided"}
Company: ${validatedData.company || "Not provided"}

Message:
${validatedData.message}
        `;

        await notifyOwner({
          title: notificationTitle,
          content: notificationContent,
        });

        // Return success response
        return {
          success: true,
          message: "Your message has been sent successfully! We'll get back to you soon.",
          data: {
            name: validatedData.name,
            email: validatedData.email,
          },
        };
      } catch (error) {
        console.error("[Contact Form Error]", error);
        throw new Error("Failed to submit contact form. Please try again later.");
      }
    }),
});
