"use server";

import { z } from "zod";
import {
  contactSchema,
  enhancedContactSchema,
  optionBSchema,
  projectInterestsEnumValues,
} from "@/lib/schemas";

export type ContactFormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  success?: boolean;
};

export async function submitContactForm(
  prevState: ContactFormState,
  data: FormData
): Promise<ContactFormState> {
  const formData = Object.fromEntries(data);
  const parsed = contactSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      message: "Invalid form data.",
      fields: formData as Record<string, string>,
      issues: parsed.error.issues.map((issue) => issue.message),
      success: false,
    };
  }

  // Simulate sending an email or saving to a database
  console.log("Contact form submitted:", parsed.data);
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

  return {
    message: "Thank you for your message! We'll be in touch soon.",
    success: true,
  };
}

export type EnhancedContactFormState = {
  message: string;
  fields?: Record<string, any>;
  issues?: string[];
  success?: boolean;
  submittedData?: z.infer<typeof enhancedContactSchema>;
};

export async function submitEnhancedContactForm(
  prevState: EnhancedContactFormState,
  data: FormData
): Promise<EnhancedContactFormState> {
  const formData = Object.fromEntries(data);
  const projectInterestValues = data.getAll(
    "projectInterest"
  ) as (typeof projectInterestsEnumValues)[number][];

  const processedFormData = {
    ...formData,
    // Assuming 'agencyName' from schema maps to 'agencyDepartment' from form if used
    agencyName: formData.agencyDepartment || formData.agencyName,
    projectInterest:
      projectInterestValues.length > 0 ? projectInterestValues : undefined,
    textUpdates: formData.textUpdates === "on" ? "on" : undefined,
    sendBuyersGuide: formData.sendBuyersGuide === "on" ? "on" : undefined,
    subscribeInsights: formData.subscribeInsights === "on" ? "on" : undefined,
  };
  const parsed = enhancedContactSchema.safeParse(processedFormData);
  if (!parsed.success) {
    return {
      message: "Invalid form data. Please check the fields below.",
      fields: processedFormData,
      issues: parsed.error.issues.map(
        (issue) => `${issue.path.join(".")}: ${issue.message}`
      ),
      success: false,
    };
  }
  console.log("Enhanced Contact Form Submitted (Not Option B):", parsed.data);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    message: `Thank you, ${parsed.data.firstName}! Your request has been received.`,
    success: true,
    submittedData: parsed.data,
  };
}

export type OptionBFormState = {
  message: string;
  fields?: Record<string, any>;
  issues?: string[];
  success?: boolean;
  submittedData?: z.infer<typeof optionBSchema>;
};

export async function submitOptionBForm(
  prevState: OptionBFormState,
  data: FormData
): Promise<OptionBFormState> {
  const formData = Object.fromEntries(data);
  const projectInterestValues = data.getAll("projectInterest");

  const processedData = {
    ...formData,
    projectInterest:
      projectInterestValues.length > 0 ? projectInterestValues : undefined, // Set to undefined if empty for optional array
    projectInterestOther: formData.projectInterestOther || "",
  };

  const parsed = optionBSchema.safeParse(processedData);

  if (!parsed.success) {
    console.log(
      "Validation Errors (Option B):",
      parsed.error.flatten().fieldErrors
    );
    const issues = parsed.error.issues.map(
      (issue) => `${issue.path.join(".")}: ${issue.message}`
    );
    return {
      message: "Please check the fields below.",
      fields: processedData,
      issues: issues,
      success: false,
    };
  }

  console.log("Option B Form Submitted:", parsed.data);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    // Using firstName in the success message
    message: `Thank you, ${parsed.data.firstName}! Your request has been received.`,
    success: true,
    submittedData: parsed.data,
  };
}
