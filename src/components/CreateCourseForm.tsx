"use client"
import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form'
import {z} from'zod'
import { createChaptersSchema } from '@/validator/course'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from './ui/input'
import { Separator } from '@radix-ui/react-separator'
import { Button } from './ui/button'
import { Plus, Trash2Icon } from 'lucide-react'
import {motion,AnimatePresence} from 'framer-motion'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useToast } from './ui/use-toast'
import { useRouter } from 'next/navigation'
import ForgeCoins from './ForgeCoins'
type Props = {}
type Input=z.infer<typeof createChaptersSchema>
const CreateCourseForm = (props: Props) => {
    const router=useRouter()
    const {toast}=useToast()
    const { mutate: createChapters,status } = useMutation({
        mutationFn: async ({ title, units }: Input) => {
          const response = await axios.post("/api/course/createChapters", {
            title,
            units,
          });
          return response.data;
        },
      });
    const form =useForm<Input>({
        resolver:zodResolver(createChaptersSchema),
        defaultValues:{
            title:'',
            units:['','','']
        }
    })
    function onSubmit(data:Input){
        console.log("hii")
    if(data.units.some(unit=>unit===''))
    {
        toast({
            title: "Error",
            description: "Please fill all the units",
            variant: "destructive",
          });
          return;
    }
        createChapters(data,{
            onSuccess:({course_id})=>{
                toast({
                    title: "Success",
                    description: "Course created successfully",
                  });
                  router.push(`/gencourse/${course_id}`);
            },
            onError:(error)=>{
                console.log(error)
                toast({
                    title: "Error",
                    description: "Something went wrong",
                    variant: "destructive",
                  });
            }
        })
    }
    console.log(form.watch())
   // const isLoading =status==='loading'
  return (
    
    <div className='w-full'>
<Form {...form}>
<form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col items-start w-full sm:items-center sm:flex-row">
                  <FormLabel className="flex-[1] text-2xl text-violet-800 font-extrabold">Title</FormLabel>
                  <FormControl className="flex-[6]">
                  <Input placeholder='enter the main title'{...field}/>
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <AnimatePresence>
            {form.watch("units").map((_,index)=>{
                return(
                    <motion.div key={index}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{
                      opacity: { duration: 0.2 },
                      height: { duration: 0.2 },
                    }}
                    >
                    <FormField key={index} control={form.control} name={`units.${index}`} 
                    render={({ field }) => {return(
                        <FormItem className='flex flex-col items-start w-full sm:items-center sm:flex-row'>
                            <FormLabel className='flex-[1] text-xl text-violet-800 font-semibold'>
                                UNIT {index+1}
                            </FormLabel>
                            <FormControl className="flex-[6]">
                                <Input placeholder='enter the subtopics' {...field}/>

                            </FormControl>
                        </FormItem>
                    )}}
                    />
                    </motion.div>
                )
            })}
            </AnimatePresence>
            <div className="flex items-center justify-center mt-6">
                <Separator className="flex-[1]"/>
                <div className="mx-4">
                    <Button type="button" variant="secondary" className="font-semibold hover:bg-green-200" onClick={()=>{
                        form.setValue('units',[...form.watch('units'),""])
                    }}>
                        Add unit
                        <Plus className="w-4 h-4 ml-2 text-green-500"/>
                    </Button>
                    <Button type="button"variant="secondary" className="font-semibold ml-2 hover:bg-red-400" onClick={()=>{
                        form.setValue('units',[...form.watch('units').slice(0,-1)])
                    }}>
                        Remove unit
                        <Trash2Icon className="w-4 h-4 ml-2 text-red-500"/>
                    </Button>
                    <Separator className='flex-[1]'/>
                </div>

            </div>
            <Button type='submit' className="w-full mt-6 bg-violet-600 hover:bg-violet-500" size='lg'>Lets Go</Button>
          </form>
        </Form>
    <ForgeCoins/>
    </div>
    
  )
}

export default CreateCourseForm