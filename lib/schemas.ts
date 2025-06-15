import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." })
    .max(500, { message: "Message must be less than 500 characters." }),
});

export const governmentLevels = [
  "Federal",
  "State",
  "County/Regional",
  "City/Municipal",
  "Tribal",
  "Special District",
  "Other",
] as const;

export const projectInterestsEnumValues = [
  // Renamed to avoid conflict with projectInterest field
  "Improving citizen experience",
  "Reducing support tickets",
  "Meeting accessibility requirements",
  "Modernizing legacy search",
  "Data analytics needs",
  "Other",
] as const;

export const currentSearchSolutions = [
  "No search functionality",
  "Basic keyword search",
  "Google Site Search",
  "Elasticsearch",
  "Custom solution",
  "Other platform",
  "Not sure",
] as const;

export const websiteTraffics = [
  "Under 10,000 monthly visitors",
  "10,000 - 50,000",
  "50,000 - 250,000",
  "250,000 - 1 million",
  "Over 1 million",
  "Not sure",
] as const;

export const timelines = [
  "Immediate need (0-3 months)",
  "This fiscal year",
  "Next fiscal year",
  "Researching for future",
  "RFP/RFI stage",
] as const;

export const budgetRanges = [
  "Under $25,000",
  "$25,000 - $50,000",
  "$50,000 - $100,000",
  "$100,000 - $250,000",
  "Over $250,000",
  "Need budget guidance",
  "Prefer not to say",
] as const;

// This schema is not actively used by the primary form but is updated for consistency.
export const enhancedContactSchema = z.object({
  firstName: z.string().min(1, "First name is required."), // Reverted from fullName
  lastName: z.string().min(1, "Last name is required."), // Reverted from fullName
  workEmail: z
    .string()
    .email("Invalid email address.")
    .refine((email) => email.endsWith(".gov") || email.includes("@"), {
      message: "Please use your .gov or official email if possible.",
    }),
  phone: z.string().optional(),
  textUpdates: z.enum(["on"]).optional(),

  agencyName: z.string().min(1, "Agency/Department name is required."), // Assuming this is agencyDepartment
  governmentLevel: z.enum(governmentLevels, {
    required_error: "Government level is required.",
  }),
  governmentLevelOther: z.string().optional(),
  stateTerritory: z.string().optional(), // Made optional
  agencyWebsite: z.string().url("Invalid URL.").optional().or(z.literal("")),

  projectInterest: z.array(z.enum(projectInterestsEnumValues)).optional(), // Made optional
  projectInterestOther: z.string().optional(),
  currentSearchSolution: z.enum(currentSearchSolutions).optional(),
  estimatedWebsiteTraffic: z.enum(websiteTraffics).optional(),

  timeline: z.enum(timelines, { required_error: "Timeline is required." }),
  budgetRange: z.enum(budgetRanges).optional(),
  howCanWeHelp: z.string().max(1000, "Message too long.").optional(),

  sendBuyersGuide: z.enum(["on"]).optional(),
  subscribeInsights: z.enum(["on"]).optional(),
});

const OTHER_INTEREST_CHECKBOX_LABEL = "Other";

export const optionBSchema = z
  .object({
    firstName: z.string().min(1, "First name is required."),
    lastName: z.string().min(1, "Last name is required."),
    workEmail: z.string().email("Please enter a valid email address."),
    agencyDepartment: z
      .string()
      .min(2, "Please enter your agency or department."),
    stateTerritory: z.string().optional(), // Now optional
    agencyWebsite: z
      .string()
      .url("Invalid URL format. Please include http:// or https://")
      .optional()
      .or(z.literal("")),
    projectInterest: z.array(z.string()).optional(), // Now optional (removed .min(1))
    projectInterestOther: z
      .string()
      .max(255, "Other interest details are too long (max 255 characters).")
      .optional(),
    howCanWeHelp: z.string().max(1000, "Message is too long.").optional(),
    phone: z.string().optional(),
  })
  .refine(
    (data) => {
      if (
        data.projectInterest?.includes(OTHER_INTEREST_CHECKBOX_LABEL) && // Added optional chaining for projectInterest
        (!data.projectInterestOther || data.projectInterestOther.trim() === "")
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Please specify your interest when 'Other' is selected.",
      path: ["projectInterestOther"],
    }
  );
