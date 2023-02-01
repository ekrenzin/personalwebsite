<script lang="ts">
    import emailjs from "@emailjs/browser";
	import { page } from '$app/stores';
    
        let form: HTMLFormElement = null;
    
        async function submitEmail (event) {
          try {
            event.preventDefault();
            await emailjs.sendForm(
              "service_6vij30t",
              "template_newrwwq",
              form,
              "BJByXghceDtqQ2Acw"
            );
            form.reset();
          } catch (e) {
            console.warn(e)
          }
        }
    </script>
        <div class="bg-slate-900 h-screen py-4 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-4">
          <div class="relative max-w-xl mx-auto">
            <svg
              class="absolute left-full transform translate-x-1/2"
              width="404"
              height="404"
              fill="none"
              viewBox="0 0 404 404"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="85737c0e-0916-41d7-917f-596dc7edfa27"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    class="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width="404"
                height="404"
                fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
              />
            </svg>
            <svg
              class="absolute right-full bottom-0 transform -translate-x-1/2"
              width="404"
              height="404"
              fill="none"
              viewBox="0 0 404 404"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="85737c0e-0916-41d7-917f-596dc7edfa27"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    class="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width="404"
                height="404"
                fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
              />
            </svg>
            <div class="text-center py-10">
              <h1
                class="
                  text-4xl
                  tracking-tight
                  font-extrabold
                  text-gray-900
                  sm:text-5xl
                  md:text-6xl
                "
              >
                <span class="text-gray-100">Contact</span>
              </h1>
              </div>    
            <div class="">
              <form
                class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
                on:submit={submitEmail}
                bind:this={form}
              >
                <div>
                  <label
                    for="first-name"
                    class="block text-sm font-medium text-gray-200"
                    >First name</label
                  >
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
                  <label
                    for="last-name"
                    class="block text-sm font-medium text-gray-200"
                    >Last name</label
                  >
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
                  <label
                    for="company"
                    class="block text-sm font-medium text-gray-200"
                    >Company</label
                  >
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
                  <label for="email" class="block text-sm font-medium text-gray-200"
                    >Email</label
                  >
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
                  <label
                    for="phone-number"
                    class="block text-sm font-medium text-gray-200"
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
                  <label
                    for="message"
                    class="block text-sm font-medium text-gray-200"
                    >Message</label
                  >
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
                      bg-indigo-600
                      hover:bg-indigo-200
                      focus:outline-none
                      focus:ring-2
                      focus:ring-offset-2
                      focus:ring-indigo-500
                    "
                  >
                    Let's talk
                  </button>
                </div>
              </form>
              <p class="mt-4 text-lg leading-6 text-gray-500 text-center py-5">
                Or email me directly at ean@eankrenzin.com
              </p>
            </div>
          </div>
        </div>
    