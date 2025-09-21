


"use client"
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import MDEditor from '@uiw/react-md-editor';
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useActionState } from 'react';
import { formSchema } from "@/lib/validation";
import z from "zod";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/action";
import { toast } from "sonner";

const StartupForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [pitch, setPitch] = React.useState("");
    const router = useRouter()

    const handleFormSubmit = async (prevState: { error: string; status: string }, formData: FormData) => {
        try {
            const formValues = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                pitch,
            }
            await formSchema.parseAsync(formValues);

            const result = await createPitch(prevState, formData, pitch);

            // Check if the result indicates success
            if (result.status === "SUCCESS") {
                toast.success("Startup created successfully!", {
                    description: "Your startup has been added to the platform.",
                    duration: 3000,
                });
                // Redirect to home page after a short delay
                setTimeout(() => {
                    router.push("/");
                }, 1500);
            } else if (result.status === "ERROR") {
                toast.error("Failed to create startup", {
                    description: result.error || "An unexpected error occurred. Please try again.",
                    duration: 5000,
                });
            }

            return result;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldError = z.flattenError(error);
                // Convert arrays to strings (take first error message)
                const flatErrors: Record<string, string> = {};
                Object.entries(fieldError.fieldErrors).forEach(([key, value]) => {
                    flatErrors[key] = Array.isArray(value) ? value[0] : value;
                });
                setErrors(flatErrors);

                toast.error("Validation failed", {
                    description: "Please check your form inputs and try again.",
                    duration: 5000,
                });

                return { ...prevState, error: "Validation failed", status: "ERROR" };
            }

            toast.error("An unexpected error occurred", {
                description: "Please try again later.",
                duration: 5000,
            });

            return {
                ...prevState,
                error: "An unexpected error has occurred",
                status: "ERROR"
            };
        }
    };

    const [state, formAction, isPending] = useActionState(handleFormSubmit, { error: "", status: "INITIAL" });

    return (
        <div className="w-full">
            <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white font-montserrat mb-2">
                    Tell us about your startup
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Fill out the form below to submit your innovative startup to Morocco's digital ecosystem
                </p>
            </div>

            <form action={formAction} className="startup-form">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="title" className="startup-form_label">Startup Title *</label>
                        <Input
                            name="title"
                            id="title"
                            className="startup-form_input"
                            placeholder="Enter your startup name"
                            required
                        />
                        {errors.title && <p className="startup-form_error">{errors.title}</p>}
                    </div>

                    <div>
                        <label htmlFor="category" className="startup-form_label">Category *</label>
                        <Input
                            name="category"
                            id="category"
                            className="startup-form_input"
                            placeholder="e.g., Fintech, EdTech, HealthTech"
                            required
                        />
                        {errors.category && <p className="startup-form_error">{errors.category}</p>}
                    </div>
                </div>

                <div>
                    <label htmlFor="description" className="startup-form_label">Description *</label>
                    <textarea
                        name="description"
                        id="description"
                        className="startup-form_textarea"
                        placeholder="Briefly describe what your startup does and its main features"
                        required
                        rows={4}
                    />
                    {errors.description && <p className="startup-form_error">{errors.description}</p>}
                </div>

                <div>
                    <label htmlFor="link" className="startup-form_label">Image URL *</label>
                    <Input
                        name="link"
                        id="link"
                        className="startup-form_input"
                        placeholder="https://example.com/your-startup-image.jpg"
                        required
                    />
                    {errors.link && <p className="startup-form_error">{errors.link}</p>}
                </div>

                <div data-color-mode="light">
                    <label htmlFor="pitch" className="startup-form_label">Pitch *</label>
                    <div className="border-2 border-black rounded-lg overflow-hidden shadow-[2px_2px_0px_#3B82F6]">
                        <MDEditor
                            value={pitch}
                            onChange={(value) => setPitch(value as string)}
                            id="pitch"
                            preview="edit"
                            height={300}
                            style={{
                                borderRadius: 0,
                                overflow: 'hidden',
                                backgroundColor: 'white'
                            }}
                            textareaProps={{
                                placeholder: "Describe your startup idea, the problem it solves, your target market, and what makes it unique...",
                                style: {
                                    backgroundColor: 'white',
                                    color: 'black',
                                    fontSize: '14px',
                                    lineHeight: '1.5'
                                }
                            }}
                            previewOptions={{
                                disallowedElements: ["style"],
                            }}
                        />
                    </div>
                    {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
                </div>

                <div className="pt-4">
                    <Button type={"submit"} className={"startup-form_btn"} disabled={isPending}>
                        {isPending ? "Submitting..." : "Submit Your Startup"}
                        <Send className="size-5 ml-2" />
                    </Button>
                </div>
            </form>
        </div>
    );
};



export default StartupForm;