import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Github, Linkedin, Mail, Code, Terminal } from "lucide-react"
import Link from "next/link"

export default function DevelopersPage() {
  const developers = [
    {
      name: "Muhammed Aflah S",
      role: "Lead Developer",
      university: "S.R.M University",
      department: "CSE - AI/ML Department",
      icon: Code,
      iconColor: "text-green-400",
      iconBg: "bg-green-900/50",
      github: "https://github.com/muhammed-aflah",
      linkedin: "https://linkedin.com/in/muhammed-aflah",
      email: "muhammed.aflah@example.com",
    },
    {
      name: "Ahsan Hassan",
      role: "Backend Developer",
      university: "S.R.M University",
      department: "AI/ML Department",
      icon: Terminal,
      iconColor: "text-blue-400",
      iconBg: "bg-blue-900/50",
      github: "https://github.com/ahsan-hassan",
      linkedin: "https://linkedin.com/in/ahsan-hassan",
      email: "ahsan.hassan@example.com",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">Meet Our Developers</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {developers.map((developer, index) => {
          const DevIcon = developer.icon

          return (
            <Card key={index} className="bg-gray-800/50 border-green-800/50 overflow-hidden">
              <div className="h-24 bg-gradient-to-r from-green-900 to-green-700"></div>
              <div className="px-6 -mt-12 pb-6">
                <Avatar className={`h-24 w-24 border-4 border-gray-800 ${developer.iconBg}`}>
                  <DevIcon className={`h-12 w-12 ${developer.iconColor}`} />
                  <AvatarFallback className="bg-green-800 text-white text-xl">
                    {developer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <CardHeader className="px-0">
                  <CardTitle className="text-green-200 text-xl mt-2">{developer.name}</CardTitle>
                  <CardDescription className="text-gray-300">{developer.role}</CardDescription>
                </CardHeader>

                <CardContent className="px-0 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-1">University</h3>
                    <p className="text-white">{developer.university}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-1">Department</h3>
                    <p className="text-white">{developer.department}</p>
                  </div>

                  <div className="flex space-x-4 pt-2">
                    <Link
                      href={developer.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </Link>

                    <Link
                      href={developer.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </Link>

                    <Link
                      href={`mailto:${developer.email}`}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      <Mail className="h-5 w-5" />
                    </Link>
                  </div>
                </CardContent>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="mt-12 text-center">
        <Card className="bg-gray-800/50 border-green-800/50">
          <CardHeader>
            <CardTitle className="text-green-200">About the Project</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300">
            <p>
              The Green Chemistry Helper was developed as a project to promote sustainable chemistry practices. Our goal
              is to help chemists and students identify greener alternatives for their chemical reactions and reduce the
              environmental impact of chemical processes.
            </p>
            <p className="mt-4">
              This project was developed by students from the AI/ML department at S.R.M University, combining expertise
              in chemistry, artificial intelligence, and web development.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
