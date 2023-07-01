"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HTMLAttributes } from "react";

interface PageProps extends HTMLAttributes<HTMLElement> { }

function FAQAccordian({ className }: PageProps) {
    return (
        <>
            <Accordion type="single" collapsible className={className}>
                <AccordionItem value="item-1">
                    <AccordionTrigger>What are blogs?</AccordionTrigger>
                    <AccordionContent>
                        Blogs are a type of regularly updated websites that provide insight into a certain topic. The word blog is a combined version of the words &lsquo;web&rsquo; and &lsquo;log&rsquo;. At their inception, blogs were simply an online diary where people could keep a log about their daily lives on the web. They have since morphed into an essential forum for individuals and businesses alike to share information and updates.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>How can I write a blog using this tool?</AccordionTrigger>
                    <AccordionContent>
                        if you do not have any blogs yet, click on the button that says &lsquo;New Blog&rsquo;. This will redirect you to your first blog. You can set the title, thumbnail and the content of the blog. The blog content must be written in general markdown syntax.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Can I get a preview of what I just wrote in the blog?</AccordionTrigger>
                    <AccordionContent>
                        Yes, there is a dedicated button on the right side of your screen. Toggling this will change the view mode of your current blog.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>How can I publish the blog?</AccordionTrigger>
                    <AccordionContent>
                        Before publishing the blog, you must save it as draft. A publishable blog must contain all three of a title, description and thumbnail. If a blog misses any of these, that will become unpublishable. Click on the three dots of the blog, that you want to publish, and click on &lsquo;Publish&rsquo;.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                    <AccordionTrigger>Can I unpublish the blog?</AccordionTrigger>
                    <AccordionContent>
                        Yes, for this you have to click on the three dots again, and click on &lsquo;Unpublish&rsquo;.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                    <AccordionTrigger>Can I edit a blog?</AccordionTrigger>
                    <AccordionContent>
                        Yes, you can edit a blog even after publishing it. For this you have to click on the three dots, and click on &lsquo;Edit&rsquo;.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </>
    );
}

export default FAQAccordian;