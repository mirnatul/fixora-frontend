import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DescriptionModalProps {
	title: string;
	description: string;
	onClose: () => void;
}

export default function DescriptionModal({
	title,
	description,
	onClose,
}: DescriptionModalProps) {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			{/* Backdrop */}
			<div
				className="absolute inset-0 bg-black/50"
				onClick={onClose}
				aria-hidden="true"
			/>

			{/* Modal */}
			<div className="relative bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
				{/* Header */}
				<div className="sticky top-0 bg-white border-b border-border p-6 flex items-center justify-between">
					<h2 className="text-2xl font-bold text-foreground">{title}</h2>
					{/** biome-ignore lint/a11y/useButtonType: <explanation> */}
					<button
						onClick={onClose}
						className="text-muted-foreground hover:text-foreground transition-colors"
						aria-label="Close modal"
					>
						<X className="w-6 h-6" />
					</button>
				</div>

				{/* Content */}
				<div className="p-6">
					<div className="prose prose-sm max-w-none">
						<p className="text-gray-700 dark:text-muted-foreground leading-relaxed whitespace-pre-wrap">
							{description}
						</p>
					</div>
				</div>

				{/* Footer */}
				<div className="sticky bottom-0 bg-secondary border-t border-border p-6 flex justify-end gap-3">
					<Button variant="outline" onClick={onClose}>
						Close
					</Button>
				</div>
			</div>
		</div>
	);
}
