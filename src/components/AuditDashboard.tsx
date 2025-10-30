
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, AlertTriangle, Zap, Target, Code, Copy } from "lucide-react";
import { auditor, AuditPrompt } from '../utils/applicationAudit';
import { useToast } from "@/hooks/use-toast";

const AuditDashboard: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<'HIGH' | 'MEDIUM' | 'LOW' | 'all'>('all');
  const { toast } = useToast();

  const progress = auditor.getProgress();
  const allPrompts = auditor.getUnimplementedPrompts();
  
  const filteredPrompts = allPrompts.filter(prompt => {
    const categoryMatch = selectedCategory === 'all' || prompt.category === selectedCategory;
    const priorityMatch = selectedPriority === 'all' || prompt.priority === selectedPriority;
    return categoryMatch && priorityMatch;
  });

  const categories = [...new Set(allPrompts.map(p => p.category))];
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH': return 'bg-red-500';
      case 'MEDIUM': return 'bg-yellow-500';
      case 'LOW': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const copyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    toast({
      title: "Prompt Copied!",
      description: "The implementation prompt has been copied to your clipboard.",
    });
  };

  const implementFeature = (promptId: string) => {
    auditor.markAsImplemented(promptId);
    toast({
      title: "Feature Marked as Implemented",
      description: "This feature has been marked as complete in the audit system.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">🔍 Solar Panda Application Audit</h1>
        <p className="text-lg text-gray-600">Comprehensive feature implementation tracking and management</p>
      </div>

      {/* Progress Overview */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-6 w-6 text-blue-600" />
            Implementation Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">Overall Completion</span>
              <span className="text-2xl font-bold text-blue-600">{progress.percentage}%</span>
            </div>
            <Progress value={progress.percentage} className="w-full h-3" />
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div className="p-3 bg-white rounded-lg">
                <div className="text-xl font-bold text-green-600">{progress.implemented}</div>
                <div className="text-gray-600">Implemented</div>
              </div>
              <div className="p-3 bg-white rounded-lg">
                <div className="text-xl font-bold text-orange-600">{progress.total - progress.implemented}</div>
                <div className="text-gray-600">Remaining</div>
              </div>
              <div className="p-3 bg-white rounded-lg">
                <div className="text-xl font-bold text-blue-600">{progress.total}</div>
                <div className="text-gray-600">Total Features</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Priority Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              HIGH Priority
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {auditor.getPromptsByPriority('HIGH').length}
            </div>
            <p className="text-sm text-gray-600">Critical features needed</p>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-600" />
              MEDIUM Priority
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {auditor.getPromptsByPriority('MEDIUM').length}
            </div>
            <p className="text-sm text-gray-600">Enhanced features</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Code className="h-5 w-5 text-green-600" />
              LOW Priority
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {auditor.getPromptsByPriority('LOW').length}
            </div>
            <p className="text-sm text-gray-600">Nice-to-have features</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Priority</label>
              <select 
                value={selectedPriority} 
                onChange={(e) => setSelectedPriority(e.target.value as any)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="all">All Priorities</option>
                <option value="HIGH">HIGH Priority</option>
                <option value="MEDIUM">MEDIUM Priority</option>
                <option value="LOW">LOW Priority</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feature List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Features to Implement ({filteredPrompts.length})</h2>
        
        {filteredPrompts.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">All Features Implemented!</h3>
              <p className="text-gray-600">Great job! All features in this category are complete.</p>
            </CardContent>
          </Card>
        ) : (
          filteredPrompts.map((prompt, index) => (
            <Card key={prompt.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className={`${getPriorityColor(prompt.priority)} text-white`}>
                        {prompt.priority}
                      </Badge>
                      <Badge variant="outline">{prompt.category}</Badge>
                    </div>
                    <CardTitle className="text-lg">{prompt.title}</CardTitle>
                    <CardDescription className="mt-1">{prompt.description}</CardDescription>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyPrompt(prompt.prompt)}
                      className="flex items-center gap-1"
                    >
                      <Copy className="h-4 w-4" />
                      Copy Prompt
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => implementFeature(prompt.id)}
                      className="flex items-center gap-1"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Mark Done
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Implementation Prompt:</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">{prompt.prompt}</p>
                </div>
                {prompt.dependencies && (
                  <div className="mt-3">
                    <h5 className="font-medium text-sm mb-1">Dependencies:</h5>
                    <div className="flex flex-wrap gap-1">
                      {prompt.dependencies.map(dep => (
                        <Badge key={dep} variant="secondary" className="text-xs">{dep}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Next Steps */}
      {filteredPrompts.length > 0 && (
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">🚀 Recommended Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-green-700">
                <strong>Priority Implementation Order:</strong>
              </p>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                {auditor.generateImplementationLoop().slice(0, 3).map((prompt, i) => (
                  <li key={i} className="text-green-700">
                    {prompt.substring(0, 120)}...
                  </li>
                ))}
              </ol>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AuditDashboard;
