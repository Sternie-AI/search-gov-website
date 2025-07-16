"use client"

import { useEffect, useRef, useState } from "react"
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

const FieldError = ({ error }: { error?: string }) => {
  return error ? <p className="text-sm text-red-500 mt-1">{error}</p> : null
}

export function EnhancedContactForm({
  setOpen,
  onFormSuccess,
}: { setOpen: (open: boolean) => void; onFormSuccess: (data: any) => void }) {
  const formRef = useRef<HTMLFormElement>(null)
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [otherCheckboxChecked, setOtherCheckboxChecked] = useState(false)
  const [otherInterestText, setOtherInterestText] = useState("")

  const handleOtherCheckboxChange = (checked: boolean | "indeterminate") => {
    setOtherCheckboxChecked(!!checked)
    if (!checked) {
      setOtherInterestText("")
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    const form = e.currentTarget
    const formData = new FormData(form)

    // Add Web3Forms access key - you'll need to replace this with your actual key
    formData.append('access_key', 'ccc2f18f-bcd0-41fb-833f-d0a9058cf596')
    
    // Add project interests properly
    const projectInterests = formData.getAll('projectInterest')
    if (otherCheckboxChecked && otherInterestText.trim()) {
      projectInterests.push(`Other: ${otherInterestText.trim()}`)
    }
    
    // Remove existing project interest entries and add combined ones
    formData.delete('projectInterest')
    projectInterests.forEach(interest => {
      formData.append('projectInterest', interest.toString())
    })

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()

      if (result.success) {
        const firstName = formData.get('firstName') as string
        formRef.current?.reset()
        setOtherCheckboxChecked(false)
        setOtherInterestText("")
        onFormSuccess({ firstName })
        toast({
          title: "Success!",
          description: `Thank you, ${firstName}! Your request has been received.`,
        })
      } else {
        throw new Error(result.message || 'Submission failed')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      toast({
        title: "Submission Error",
        description: "There was an error submitting your form. Please try again.",
        variant: "destructive",
      })
      setErrors({ general: 'Submission failed. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input id="firstName" name="firstName" required />
          <FieldError error={errors.firstName} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input id="lastName" name="lastName" required />
          <FieldError error={errors.lastName} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="workEmail">Email *</Label>
        <div className="relative">
          <Input
            id="workEmail"
            name="workEmail"
            type="email"
            placeholder="name@agency.gov"
            className="peer"
            required
          />
          <Lock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
        <p className="text-xs text-gray-500">We'll send demo details here.</p>
        <FieldError error={errors.workEmail} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="agencyDepartment">Agency / Department *</Label>
        <Input id="agencyDepartment" name="agencyDepartment" required />
        <FieldError error={errors.agencyDepartment} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" name="phone" type="tel" placeholder="(123) 456-7890" />
        <p className="text-xs text-gray-500">For scheduling text updates.</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="stateTerritory">State / Territory</Label>
        <Select name="stateTerritory">
          <SelectTrigger>
            <SelectValue placeholder="Select a state or territory" />
          </SelectTrigger>
          <SelectContent className="bg-background border shadow-md">
            {usStatesAndTerritories.map((st) => (
              <SelectItem key={st} value={st} className="bg-background hover:bg-accent">
                {st}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldError error={errors.stateTerritory} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="agencyWebsite">Agency Website</Label>
        <Input
          id="agencyWebsite"
          name="agencyWebsite"
          type="text"
          placeholder="agency.gov"
        />
        <p className="text-xs text-gray-500">Helps us understand your current setup.</p>
        <FieldError error={errors.agencyWebsite} />
      </div>

      <div className="space-y-3">
        <Label>What brings you to SearchGov AI today?</Label>
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
            <FieldError error={errors.projectInterestOther} />
          </div>
        )}
        <FieldError error={errors.projectInterest} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="howCanWeHelp">How can we help?</Label>
        <Textarea
          id="howCanWeHelp"
          name="howCanWeHelp"
          placeholder="e.g., We need to comply with the 21st Century IDEA Act, reduce call center volume, modernize our citizen services..."
          rows={4}
        />
        <FieldError error={errors.howCanWeHelp} />
      </div>

      <div className="text-xs text-gray-500 pt-2">* Required information</div>

      <div className="pt-4">
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Submitting..." : "Schedule Demo"}
        </Button>
      </div>

      <div className="text-center text-xs text-gray-500 space-y-2 pt-2">
        <p>Together, let's make government information accessible to every citizen</p>
        
      </div>

      {errors.general && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          <p className="font-semibold">{errors.general}</p>
        </div>
      )}
    </form>
  )
}
