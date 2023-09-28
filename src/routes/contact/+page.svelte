<script lang="ts">
	import emailjs from '@emailjs/browser';

	/**
	 * @enum {string}
	 * Enum for submission status
	 */
	enum SubmissionStatus {
		IDLE = 'idle',
		SUCCESS = 'success',
		FAILURE = 'failure'
	}

	// Initialize submission status
	let submissionStatus: SubmissionStatus = SubmissionStatus.IDLE;

	/**
	 * @async
	 * @function submitEmail
	 * @param {Event} event - Form submit event
	 * @description Send email using emailjs and update submissionStatus
	 */
	async function submitEmail(event: Event) {
		event.preventDefault();
		try {
			if (!form) throw new Error('Form not found');
			await emailjs.sendForm('service_6vij30t', 'template_newrwwq', form, 'BJByXghceDtqQ2Acw');
			submissionStatus = SubmissionStatus.SUCCESS;
		} catch (e) {
			console.warn(e);
			submissionStatus = SubmissionStatus.FAILURE;
		}
	}

	let form: HTMLFormElement;
</script>

<div class="relative max-w-xl mx-auto">
	<div class="text-center py-10" />
	<!-- Title and Content Section for Contact Page -->
	<section class="text-center py-10 px-6">
		<!-- Title -->
		<h1 class="text-4xl font-semibold text-gray-200">Get In Touch</h1>

		<!-- Subtitle -->
		<h2 class="text-2xl font-medium text-sky-300 mt-4">Let's Discuss Your Next Project</h2>

		<!-- Text -->
		<p class="text-base text-sky-100 mt-6 mx-auto max-w-prose">
			Whether you're interested in working on a new project or just want to say hello, feel free to
			reach out. I'm always open to discussing new opportunities.
		</p>
	</section>
	<div class=" px-6">
		<form
			class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
			on:submit={submitEmail}
			bind:this={form}
		>
			<div>
				<label for="first-name" class="block text-sm font-medium text-gray-200">First name</label>
				<div class="mt-1">
					<input
						type="text"
						name="first_name"
						id="first_name"
						required
						autocomplete="given-name"
						class="
                        py-3
                        px-4
                        block
                        w-full
                        shadow-sm
                        text-black
                        focus:ring-indigo-500 focus:border-indigo-500
                        border border-gray-300
                        rounded-md
                      "
					/>
				</div>
			</div>
			<div>
				<label for="last-name" class="block text-sm font-medium text-gray-200">Last name</label>
				<div class="mt-1">
					<input
						type="text"
						name="last_name"
						id="last_name"
						required
						autocomplete="family-name"
						class="
                        py-3
                        px-4
                        block
                        w-full
                        shadow-sm
                        text-black
                        focus:ring-indigo-500 focus:border-indigo-500
                        border border-gray-300
                        rounded-md
                      "
					/>
				</div>
			</div>
			<div class="sm:col-span-2">
				<label for="company" class="block text-sm font-medium text-gray-200">Company</label>
				<div class="mt-1">
					<input
						type="text"
						name="company"
						id="company"
						required
						autocomplete="organization"
						class="
                        py-3
                        px-4
                        block
                        w-full
                        shadow-sm
                        text-black
                        focus:ring-indigo-500 focus:border-indigo-500
                        border border-gray-300
                        rounded-md
                      "
					/>
				</div>
			</div>
			<div class="sm:col-span-2">
				<label for="email" class="block text-sm font-medium text-gray-200">Email</label>
				<div class="mt-1">
					<input
						id="email"
						name="email"
						type="email"
						required
						autocomplete="email"
						class="
                        py-3
                        px-4
                        block
                        w-full
                        shadow-sm
                        text-black
                        focus:ring-indigo-500 focus:border-indigo-500
                        border border-gray-300
                        rounded-md
                      "
					/>
				</div>
			</div>
			<div class="sm:col-span-2">
				<label for="phone-number" class="block text-sm font-medium text-gray-200"
					>Phone Number</label
				>
				<div class="mt-1">
					<input
						id="phone"
						name="phone"
						type="phone"
						required
						autocomplete="phone"
						class="
                        py-3
                        px-4
                        block
                        w-full
                        shadow-sm
                        text-black
                        focus:ring-indigo-500 focus:border-indigo-500
                        border border-gray-300
                        rounded-md
                      "
						placeholder="+1 (555) 987-6543"
					/>
				</div>
			</div>
			<div class="sm:col-span-2">
				<label for="message" class="block text-sm font-medium text-gray-200">Message</label>
				<div class="mt-1">
					<textarea
						id="message"
						name="message"
						rows="4"
						class="
                        py-3
                        px-4
                        block
                        w-full
                        shadow-sm
                        text-black
                        focus:ring-indigo-500 focus:border-indigo-500
                        border border-gray-300
                        rounded-md
                      "
					/>
				</div>
			</div>
			<div class="sm:col-span-2">
				<button
					type="submit"
					class="
                      w-full
                      inline-flex
                      items-center
                      justify-center
                      px-6
                      py-3
                      border border-transparent
                      rounded-md
                      shadow-sm
                      text-base
                      font-medium
                      text-white
                      bg-sky-500
                      hover:bg-sky-400
                      focus:outline-none
                      focus:ring-2
                      focus:ring-offset-2
                      focus:ring-indigo-500
                    "
				>
					Let's talk
				</button>
			</div>
      <div class="text-center mt-4">
        {#if submissionStatus === SubmissionStatus.SUCCESS}
          <p class="text-green-400">Your message was successfully sent!</p>
        {:else if submissionStatus === SubmissionStatus.FAILURE}
          <p class="text-red-400">Failed to send your message. Please try again.</p>
        {/if}
      </div>
		</form>
		<p class="mt-4 text-lg leading-6 text-gray-200 text-center py-5">
			Or email me directly at ean@eankrenzin.com
		</p>
	</div>
</div>
