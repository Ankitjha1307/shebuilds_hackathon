"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useLanguage();

  useEffect(() => {
    // Log error to error reporting service in production
    if (process.env.NODE_ENV === "production") {
      // Add your error reporting service here
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="max-w-md w-full border-2">
        <CardHeader className="text-center space-y-3">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-heading">
            {t.status.errorTitle}
          </CardTitle>
          <CardDescription className="text-base">
            {t.status.errorDescription}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={reset}
              className="flex-1 gap-2"
              size="lg"
            >
              <RefreshCcw className="w-4 h-4" />
              {t.status.tryAgain}
            </Button>
            <Button
              asChild
              variant="neutral"
              className="flex-1 gap-2 border-2"
              size="lg"
            >
              <Link href="/">
                <Home className="w-4 h-4" />
                {t.status.goHome}
              </Link>
            </Button>
          </div>
          <p className="text-xs text-center text-muted-foreground">
            {t.status.errorHelp}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}