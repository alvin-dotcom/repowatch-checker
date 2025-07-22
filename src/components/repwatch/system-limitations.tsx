import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, FileCode, ServerCrash } from "lucide-react";

export function SystemLimitations() {
  return (
    <Card className="w-full max-w-lg mt-8 bg-muted/50 shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-xl flex items-center gap-2">
          <Info className="h-6 w-6 text-primary" />
          System Information
        </CardTitle>
        <CardDescription>Please be aware of the following system guidelines and limitations.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="flex items-start gap-3">
          <FileCode className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold">Accepted File Types for Upload:</h4>
            <p className="text-muted-foreground">.js, .py, .txt, .md, .java, .c, .cpp, .ts, .tsx, .html, .css, .zip</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <ServerCrash className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold">Usage Limitations:</h4>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Maximum individual file size: 10MB</li>
              <li>Maximum project (ZIP) size: 50MB</li>
              <li>GitHub repositories: Public repositories preferred. Very large repositories may take longer or face limitations.</li>
              <li>Rate limits may apply for frequent use.</li>
            </ul>
          </div>
        </div>
         <p className="text-xs text-muted-foreground pt-2">
            This tool provides an automated analysis and should be used as a guide. Always perform manual verification for critical assessments.
          </p>
      </CardContent>
    </Card>
  );
}
