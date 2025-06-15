"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import { submitOptionBForm, type OptionBFormState } from "@/app/contact-action"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Lock } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

const usStatesAndTerritories = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
  "American Samoa",
  "Guam",
  "Northern Mariana Islands",
  "Puerto Rico",
  "U.S. Virgin Islands",
  "District of Columbia",
].sort()

const projectInterestsList = [
  { id: "interest-citizen-experience", label: "Improving citizen experience" },
  { id: "interest-support-tickets", label: "Reducing support tickets" },
  { id: "interest-accessibility", label: "Meeting accessibility requirements" },
  { id: "interest-modernizing-search", label: "Modernizing legacy search" },
  { id: "interest-analytics", label: "Data analytics needs" },
  { id: "interest-other", label: "Other" },
]

const OTHER_INTEREST_LABEL = "Other"

const FieldError = ({ issues, fieldName }: { issues?: string[]; fieldName: string }) => {
  if (!issues) return null
  const fieldIssue = issues.find((issue) => issue.startsWith(fieldName + ":"))
  return fieldIssue ? <p className="text-sm text-red-500 mt-1">{fieldIssue.split(": ")[1]}</p> : null
}

export function EnhancedContactForm({
  setOpen,
  onFormSuccess,
}: { setOpen: (open: boolean) => void; onFormSuccess: (data: any) => void }) {
  const initialState: OptionBFormState = { message: "", success: false }
  const [state, formAction, isPending] = useActionState(submitOptionBForm, initialState)
  const formRef = useRef<HTMLFormElement>(null)
  const { toast } = useToast()

  const initialOtherCheckboxState =
    Array.isArray(state.fields?.projectInterest) && state.fields.projectInterest.includes(OTHER_INTEREST_LABEL)
  const [otherCheckboxChecked, setOtherCheckboxChecked] = useState(initialOtherCheckboxState)
  const [otherInterestText, setOtherInterestText] = useState(state.fields?.projectInterestOther || "")

  useEffect(() => {
    if (state.message && !state.fields) {
      toast({
        title: state.success ? "Success!" : "Submission Error",
        description: state.message,
        variant: state.success ? "default" : "destructive",
      })
    }
    if (state.success && state.submittedData) {
      formRef.current?.reset()
      setOtherCheckboxChecked(false)
      setOtherInterestText("")
      onFormSuccess(state.submittedData)
    }
    if (!state.success && state.fields) {
      const isOtherSelectedInErrors =
        Array.isArray(state.fields.projectInterest) && state.fields.projectInterest.includes(OTHER_INTEREST_LABEL)
      setOtherCheckboxChecked(isOtherSelectedInErrors)
      setOtherInterestText(state.fields.projectInterestOther || "")
    }
  }, [state, toast, onFormSuccess])

  const handleOtherCheckboxChange = (checked: boolean | "indeterminate") => {
    setOtherCheckboxChecked(!!checked)
    if (!checked) {
      setOtherInterestText("")
    }
  }

  return (
    <form ref={formRef} action={formAction} className="space-y-6 text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input id="firstName" name="firstName" defaultValue={state.fields?.firstName} />
          <FieldError issues={state.issues} fieldName="firstName" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input id="lastName" name="lastName" defaultValue={state.fields?.lastName} />
          <FieldError issues={state.issues} fieldName="lastName" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="workEmail">Work Email *</Label>
        <div className="relative">
          <Input
            id="workEmail"
            name="workEmail"
            type="email"
            placeholder="name@agency.gov"
            defaultValue={state.fields?.workEmail}
            className="peer"
          />
          <Lock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
        <p className="text-xs text-gray-500">We'll send demo details here.</p>
        <FieldError issues={state.issues} fieldName="workEmail" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="agencyDepartment">Agency / Department *</Label>
        <Input id="agencyDepartment" name="agencyDepartment" defaultValue={state.fields?.agencyDepartment} />
        <FieldError issues={state.issues} fieldName="agencyDepartment" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" name="phone" type="tel" placeholder="(123) 456-7890" defaultValue={state.fields?.phone} />
        <p className="text-xs text-gray-500">For scheduling text updates.</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="stateTerritory">State / Territory</Label>
        <Select name="stateTerritory" defaultValue={state.fields?.stateTerritory}>
          <SelectTrigger>
            <SelectValue placeholder="Select a state or territory" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            {usStatesAndTerritories.map((st) => (
              <SelectItem key={st} value={st}>
                {st}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldError issues={state.issues} fieldName="stateTerritory" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="agencyWebsite">Agency Website</Label>
        <Input
          id="agencyWebsite"
          name="agencyWebsite"
          type="url"
          placeholder="https://agency.gov"
          defaultValue={state.fields?.agencyWebsite}
        />
        <p className="text-xs text-gray-500">Helps us understand your current setup.</p>
        <FieldError issues={state.issues} fieldName="agencyWebsite" />
      </div>

      <div className="space-y-3">
        <Label>What brings you to SearchGov.ai today?</Label>
        <div className="space-y-2">
          {projectInterestsList.map((interest) => (
            <div key={interest.id}>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={interest.id}
                  name="projectInterest"
                  value={interest.label}
                  checked={interest.label === OTHER_INTEREST_LABEL ? otherCheckboxChecked : undefined}
                  onCheckedChange={interest.label === OTHER_INTEREST_LABEL ? handleOtherCheckboxChange : undefined}
                  defaultChecked={
                    interest.label !== OTHER_INTEREST_LABEL &&
                    Array.isArray(state.fields?.projectInterest) &&
                    state.fields.projectInterest.includes(interest.label)
                  }
                />
                <Label htmlFor={interest.id} className="font-normal">
                  {interest.label}
                </Label>
              </div>
            </div>
          ))}
        </div>
        {otherCheckboxChecked && (
          <div className="space-y-2 pl-6 pt-1">
            <Label htmlFor="projectInterestOther" className="sr-only">
              Other interest details
            </Label>
            <Input
              id="projectInterestOther"
              name="projectInterestOther"
              placeholder="e.g., RFP compliance, multi-agency coordination..."
              value={otherInterestText}
              onChange={(e) => setOtherInterestText(e.target.value)}
              className="text-sm"
            />
            <FieldError issues={state.issues} fieldName="projectInterestOther" />
          </div>
        )}
        <FieldError issues={state.issues} fieldName="projectInterest" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="howCanWeHelp">How can we help?</Label>
        <Textarea
          id="howCanWeHelp"
          name="howCanWeHelp"
          placeholder="e.g., We need to comply with the 21st Century IDEA Act, reduce call center volume, modernize our citizen services..."
          rows={4}
          defaultValue={state.fields?.howCanWeHelp}
        />
        <FieldError issues={state.issues} fieldName="howCanWeHelp" />
      </div>

      <div className="text-xs text-gray-500 pt-2">* Required information</div>

      <div className="pt-4">
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Submitting..." : "Schedule Demo"}
        </Button>
      </div>

      <div className="text-center text-xs text-gray-500 space-y-2 pt-2">
        <p>Together, let's make government information accessible to every citizen</p>
        <p>Your data is encrypted. No credit card or commitment required.</p>
      </div>

      {state.message && !state.success && state.issues && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          <p className="font-semibold">{state.message}</p>
        </div>
      )}
    </form>
  )
}
